const express = require("express");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const os = require("os");
const AdmZip = require("adm-zip");
const cheerio = require("cheerio");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// Helpers
function findHtmlFiles(dir, baseDir = dir) {
  let results = [];
  const items = fs.readdirSync(dir);

  for (const it of items) {
    const p = path.join(dir, it);
    const stat = fs.statSync(p);

    if (stat.isFile() && path.extname(it).toLowerCase() === ".html") {
      const relativePath = path.relative(baseDir, p);
      results.push({ fullPath: p, relativePath });
    } else if (stat.isDirectory()) {
      results = results.concat(findHtmlFiles(p, baseDir));
    }
  }

  return results;
}

// Main route
router.post("/api/upload", (req, res) => {
  const form = new formidable.IncomingForm({ multiples: true, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).send("❌ File parse error");

    const uploadedFiles = Array.isArray(files.file) ? files.file : [files.file];
    const outputDir = path.join(os.tmpdir(), "output-" + uuidv4());
    fs.mkdirSync(outputDir, { recursive: true });

    try {
      const zip = new AdmZip();

      for (const uploaded of uploadedFiles) {
        const originalName = uploaded.originalFilename || uploaded.newFilename || "upload";
        const ext = path.extname(originalName).toLowerCase();
        const workDir = path.join(os.tmpdir(), "tilda-" + uuidv4());
        fs.mkdirSync(workDir, { recursive: true });

        // ZIP extract ya single HTML copy
        if (ext === ".zip") {
          const zipInner = new AdmZip(uploaded.filepath);
          zipInner.extractAllTo(workDir, true);
        } else {
          const dest = path.join(workDir, originalName);
          fs.copyFileSync(uploaded.filepath, dest);
        }

        // HTML files find karein
        const htmlFiles = findHtmlFiles(workDir);

        for (const { fullPath, relativePath } of htmlFiles) {
          let html = fs.readFileSync(fullPath, "utf8");
          const $ = cheerio.load(html, { decodeEntities: false });

          // Cleanup
          $('noscript, script, header, footer, nav, .header, .footer, .nav').remove();
          $('meta').not('[name="viewport"]').remove();
          $('link').remove(); // CSS remove

          $("img").attr("src", "image1.jpg").removeAttr("srcset data-src data-original");
          $("source").attr("src", "image1.jpg").removeAttr("srcset");
          $('meta[property="og:image"], meta[name="twitter:image"]').attr("content", "image1.jpg");

          // Tilda attributes/classes
          $('*').each((_, el) => {
            Object.keys(el.attribs).forEach(attr => {
              if (attr.startsWith('data-')) $(el).removeAttr(attr);
            });
          });

          $('[class]').each((_, el) => {
            const classes = ($(el).attr('class') || '').split(' ')
              .filter(cls => !cls.startsWith('t') && !cls.includes('tn-') && !cls.includes('tilda'))
              .join(' ');
            if (classes) $(el).attr('class', classes);
            else $(el).removeAttr('class');
          });

          const bodyContent = $('body').html();
          const cleanHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${path.basename(relativePath)}</title>
</head>
<body>
${bodyContent}
</body>
</html>`;

          // Add to ZIP with original filename
          const tempHtmlPath = path.join(os.tmpdir(), uuidv4() + ".html");
          fs.writeFileSync(tempHtmlPath, cleanHtml);

          zip.addLocalFile(tempHtmlPath, path.dirname(relativePath), path.basename(relativePath));
          fs.rmSync(tempHtmlPath, { force: true });
        }

        fs.rmSync(workDir, { recursive: true, force: true });
      }

      const zipFilePath = path.join(outputDir, "clean-files.zip");
      zip.writeZip(zipFilePath);

      res.setHeader("Content-Disposition", "attachment; filename=clean-files.zip");
      res.setHeader("Content-Type", "application/zip");
      res.send(fs.readFileSync(zipFilePath));

    } catch (e) {
      console.error(e);
      res.status(500).send("❌ Processing failed");
    } finally {
      fs.rmSync(outputDir, { recursive: true, force: true });
    }
  });
});

module.exports = router;
