import { getAllBlogs } from "@/api/blog/getAllBlogs";
import HeroSection from "@/components/Common/HeroSectionNew/HeroSectionNew";
import BlogSearchUI from "../../components/Blogs/Blogs"; // Client part
import { generateBlogListingSchema } from "@/schema/blogPage";
import {
  Heading2, Heading3, RichParagraph,
  ImageWithSkeleton, SecondaryButton
} from '@/components/Common/Common';
import { BookOpen, Search } from "lucide-react";

// Dynamic Metadata for SEO
export async function generateMetadata({ searchParams }) {
  const { search, page } = await searchParams;
  const currentPage = parseInt(page) || 1;
  const searchTerm = search || "";

  const pageSuffix = currentPage > 1 ? ` - Page ${currentPage}` : "";
  const searchSuffix = searchTerm ? ` for "${searchTerm}"` : "";

  const title = `${searchTerm ? `Search: ${searchTerm}` : "Van Conversion Blog"}${pageSuffix} | Big Bear Vans`;
  const description = `Explore expert van conversion guides${searchSuffix}. Tips on layouts, solar, and more.${pageSuffix}`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.bigbearvans.com/blog${currentPage > 1 ? `?page=${currentPage}` : ""}`,
    },
    robots: searchTerm ? "noindex, follow" : "index, follow",
    openGraph: {
      title,
      description,
      images: ["https://www.bigbearvans.com/heroSlider/bloghero.webp"],
    },
  };
}

export default async function page({ searchParams }) {
  const { search, page } = await searchParams;
  const currentPage = parseInt(page) || 1;
  const searchTerm = search || "";

  // Data Fetching on Server
  const data = await getAllBlogs(currentPage, searchTerm);
  const blogs = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const blogSchema = generateBlogListingSchema(blogs, currentPage);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />


      <main className="bg-secondary min-h-screen">
        <HeroSection
          title="Journal & Guides"
          description="Insights, tips, and inspiration for your life on the road."
          image="/heroSlider/bloghero.webp"
          showButton={false}
        />

        <div className="max-w-[1300px] mx-auto px-4 lg:px-8 py-16 lg:py-24">

          {/* Search Bar (Client Component) */}
          <BlogSearchUI initialSearch={searchTerm} />

          {/* --- BLOG GRID --- */}
          <div className="space-y-12">
            <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
              <BookOpen size={24} className="!text-hover" />
              <Heading2
                text={searchTerm ? `Results for "${searchTerm}"` : "Latest Articles"}
                className="!mb-0"
              />
            </div>

            {blogs.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-[8px] border border-dashed border-primary/10">
                <Search size={48} className="mx-auto text-primary/10 mb-4" />
                <p className="text-primary/40 font-medium">No articles found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <article
                    key={blog._id}
                    className="group bg-white rounded-[12px] border border-primary/5 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <ImageWithSkeleton
                        src={blog.gallery?.[0]}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex-grow space-y-4">
                        <p className="!text-hover font-bold text-[10px] tracking-widest uppercase">Article</p>
                        <Heading3 text={blog.title} className="group-hover:!text-hover transition-colors line-clamp-2" />
                        <RichParagraph className="line-clamp-3 !text-primary/70 !text-sm">
                          {blog.description}
                        </RichParagraph>
                      </div>
                      <div className="mt-8 pt-6 border-t border-secondary">
                        <SecondaryButton
                          label="Read Full Story"
                          link={`/blog-detail/${blog.slug}`}
                          className="w-full text-center"
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* --- PAGINATION (Server Side Links) --- */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-12 mt-20 pt-12 border-t border-primary/10">
                <SecondaryButton
                  label="Prev"
                  link={currentPage > 1 ? `/blog?page=${currentPage - 1}${searchTerm ? `&search=${searchTerm}` : ""}` : null}
                  disabled={currentPage === 1}
                  className="!py-2 !px-8"
                />

                <div className="text-center">
                  <p className="text-[10px] font-black text-primary/30 uppercase tracking-[0.3em] mb-1">Page</p>
                  <p className="text-lg font-bold text-primary font-serif">{currentPage} / {totalPages}</p>
                </div>

                <SecondaryButton
                  label="Next"
                  link={currentPage < totalPages ? `/blog?page=${currentPage + 1}${searchTerm ? `&search=${searchTerm}` : ""}` : null}
                  disabled={currentPage === totalPages}
                  className="!py-2 !px-8"
                />
              </div>
            )}
          </div>
        </div>
      </main>

    </>
  );
}