import "./globals.css";

export const metadata = {
  title: {
    default: "Live Fruit Juice | Fresh Juices Delivered",
    template: `%s | Live Fruit Juice`,
  },
  description:
    "Live Fruit Juice — fresh, vibrant, hand-crafted fruit juices in 3 sizes. Order now for fast delivery!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
