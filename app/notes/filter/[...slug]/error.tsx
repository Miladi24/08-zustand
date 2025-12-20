// "use client";

// export default function Error({
//   error,
//   reset,
// }: {
//   error: Error;
//   reset: () => void;
// }) {
//   return (
//     <div>
//       <h2>Something went wrong 😢</h2>
//       <button onClick={reset}>Try again</button>
//     </div>
//   );
// }

"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error }: ErrorProps) {
  return <p>Could not fetch note details. {error.message}</p>;
}