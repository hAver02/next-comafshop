export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <div className="container grid place-items-center min-h-screen ">{children}</div>

}