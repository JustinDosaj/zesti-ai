import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Container } from "../shared/container"
import formatDate from '@/utils/date-format';
import Link from "next/link"

export function BlogList({ blogContent }: any) {

    const sortedBlogContent = blogContent.sort((a: any, b: any) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

    return (
      <Container className={`grid justify-center lg:flex-row gap-10 lg:gap-12 animate-fadeIn`}>
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {sortedBlogContent.map((post: any) => (
            <Link key={post.id} href={`/explore/post/${post.slug}`}>
              <article
                key={post.id}
                className="flex flex-col items-start justify-between border rounded-3xl h-full"
              >
                <div className="relative w-full">
                  <img
                    src={post.image.fields.file.url}
                    alt=""
                    className="aspect-[16/9] w-full rounded-t-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                </div>
                <div className="flex flex-col justify-between flex-grow p-4">
                  <div>
                    <div className="mt-2 flex items-center gap-x-4 text-xs">
                      <time dateTime={post.datetime} className="text-gray-500">
                        {formatDate(post.publishDate)}
                      </time>
                      <p className="relative z-10 rounded-full faded-bg text-gray-700 px-3 py-1.5 font-medium ">
                        {post.category}
                      </p>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-700">
                        <span className="absolute inset-0" />
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-gray-600 line-clamp-3">{documentToReactComponents(post.description)}</p>
                    </div>
                  </div>
                  <div className="relative mt-3 flex items-center gap-x-4">
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <span className="absolute inset-0" />
                        <span className="text-gray-700">by {post.author}</span>
                      </p>
                      <p className="text-gray-600">{post.author.role}</p>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </Container>
    );
  }