import axios from "axios";
import BlogContentUI from "../../../components/BlogDetail/Blogdetail";
import { generateBlogSchema } from "@/schema/blogDetail";
import { Heading1, ImageWithSkeleton } from '@/components/Common/Common';
import { CalendarDays, Clock, BookOpen } from "lucide-react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/test-blog/${slug}`);
    const blog = res.data.data;

    const title = `${blog.title} | Big Bear Vans`;

    // HTML tags hata ke clean text lo, phir 155 chars tak cut karo
    const rawDesc = blog.description?.replace(/<[^>]*>/g, "") || "";
    const description = rawDesc.length > 155
      ? rawDesc.slice(0, 155).trim() + "..."
      : rawDesc || "Expert camper van guides by Big Bear Vans.";

    const image = blog.gallery?.[0] || "/heroSlider/bloghero.webp";

    return {
      title,
      description,
      alternates: { canonical: `https://www.bigbearvans.com/blog-detail/${slug}` },
      openGraph: {
        title,
        description,
        images: [image],
        type: "article",
        authors: ["Artur & Anna"],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  } catch (e) {
    return { title: "Blog Not Found" };
  }
}

export default async function page({ params }) {
  const { slug } = await params;

  // ✅ 2. Server-side Fetching
  let blog = null;
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/test-blog/${slug}`);
    blog = res.data.data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
  if (!blog) return <div className="py-20 text-center">Blog post not found</div>;

  const currentUrl = `https://www.bigbearvans.com/blog-detail/${slug}`;
  const schemaData = generateBlogSchema(blog, currentUrl);
  const heroImage = blog.gallery?.[0] || "/heroSlider/bloghero.webp";

  return (
    <div className="bg-secondary min-h-screen font-serif">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      {/* --- CINEMATIC HERO (Static Part) --- */}
      <section className="relative h-[70vh] lg:h-[90vh] bg-primary overflow-hidden">
        <ImageWithSkeleton src={heroImage} alt={blog.title} className="w-full h-full object-cover opacity-50 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-20 px-4">
          <div className="max-w-5xl mx-auto w-full text-center">
            <p className="!text-hover font-black text-xs lg:text-sm tracking-[0.5em] uppercase mb-6">Expert Journal</p>
            <Heading1 text={blog.title} className="!text-white !leading-[1.1] !mb-8 drop-shadow-2xl" />
            <div className="flex flex-wrap justify-center gap-8 text-white/60 text-[10px] lg:text-xs uppercase tracking-widest font-sans">
              <span className="flex items-center gap-2 border-r border-white/20 pr-8">
                <CalendarDays size={14} className="!text-hover" />
                {new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="flex items-center gap-2 border-r border-white/20 pr-8">
                <Clock size={14} className="!text-hover" />
                {Math.ceil((blog.content?.length || 0) * 1.5)} Min Read
              </span>
              <span className="flex items-center gap-2">
                <BookOpen size={14} className="!text-hover" />
                {blog.content?.length} Insights
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* --- PASS TO CLIENT UI (For Interactivity) --- */}
      <BlogContentUI blog={blog} />
    </div>
  );
}