import Image from 'next/image';
import recommendations from '../data/recommendations';

export default function Recommendations() {
  return (
    <div
      id="recs"
      className="pt-8 mt-8"
    >
      <div className="mx-auto leading-4 text-gray-800">
        <h2 className="mb-2 text-3xl font-semibold leading-7 text-gray-900">
          Recommendations
        </h2>
        <ul>
          {recommendations.map((rec) => (
            <li key={rec.full_name} className="flex my-16 mx-0">
              <div className="flex mr-6 h-20 w-20 min-h-[80px] min-w-[80px]">
                <Image
                  src={rec.avatar_url}
                  height={80}
                  width={80}
                  className="rounded-full"
                />
              </div>
              <div>
                <strong className="block mb-2 text-xl font-bold">
                  {rec.full_name}
                </strong>
                <span className="block mb-6">{rec.role}</span>
                <p className="mb-6 leading-6 text-gray-700">{rec.body}</p>
                <span className="text-sm text-gray-500">
                  {rec.published_date_text}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
