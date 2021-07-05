import Markdown from '../data/cv.mdx';

export default function Resume() {
  return (
    <article className="prose">
      <Markdown />
    </article>
  );
}
