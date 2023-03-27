// module.exports = {
//   reactStrictMode: true,
//   env: {
//     NEXT_PUBLIC_DJANGO_API_URL: process.env.NEXT_PUBLIC_DJANGO_API_URL,
//   },
//   async rewrites() {
//     return [
//       {
//         source: "/apiv01/:path*",
//         destination: `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/apiv01/:path*`,
//       },
//     ];
//   },
// };
