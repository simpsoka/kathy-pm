import Image from 'next/image';
import avatar from '../public/images/avatar.jpg';

export default function Bio() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="w-36">
          <Image src={avatar} placeholder="blur" className="rounded-full" />
        </div>
        <h1 className="my-5 text-5xl font-extrabold text-gray-900">
          Kathy Korevec (Simpson)
        </h1>
        <h2 className="mb-10 text-3xl font-semibold leading-8 text-gray-900">
          Product Manager
        </h2>
      </div>
      <p className="tracking-normal leading-normal text-lg">
        Hi! My name is Kathy. I’m from Alaska, and I’m a product manager in San
        Francisco. I believe all great products are a result of effort that
        starts with a conversation. I've taken
        <a
          href="#shipped"
          className="mx-1 leading-8 text-purple-600 underline cursor-pointer hover:text-purple-700"
        >
          products
        </a>
        from early prototypes to launch day consistently for the past 15 years.
        Through my successes (and failures) I've developed a
        <a
          href="/philosophy"
          className="mx-1 leading-8 text-purple-600 underline cursor-pointer hover:text-purple-700"
        >
          philosophy
        </a>
        about the path we take to make products that shine. My process thrives
        on the delicate dance between data driven design, business goals, and
        user feedback. I've worked with a lot of
        <a
          href="#recs"
          className="mx-1 leading-8 text-purple-600 underline cursor-pointer hover:text-purple-700"
        >
          great people
        </a>
        through the years. Now I work at GitHub, and we build tools to help
        people build apps.
        <a
          href="/contact"
          className="mx-1 leading-8 text-purple-600 underline cursor-pointer hover:text-purple-700"
        >
          Say hi
        </a>
        👍😎.
      </p>
      <p className="text-gray-500 mt-4">
        Last revised
        <a
          href="https://gist.github.com/b35fcde405ddbf4b9ab1"
          className="mx-1 leading-6 underline cursor-pointer hover:text-purple-700"
        >
          <abbr title="2021-06-27T14:07:36Z" className="">
            Sunday, June 27th 2021
          </abbr>
        </a>
      </p>
    </>
  );
}
