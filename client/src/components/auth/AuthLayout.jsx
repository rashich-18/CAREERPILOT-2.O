
function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816]">

      {/* Purple Blob */}
      <div
        className="absolute left-10 top-20 h-72 w-72 rounded-full
        bg-violet-600/20 blur-[120px]"
      />

      {/* Blue Blob */}
      <div
        className="absolute right-20 bottom-20 h-80 w-80 rounded-full
        bg-blue-600/20 blur-[140px]"
      />

      {/* Pink Blob */}
      <div
        className="absolute left-1/2 top-1/2 h-60 w-60
        -translate-x-1/2 -translate-y-1/2
        rounded-full bg-fuchsia-500/10 blur-[120px]"
      />

     
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        {children}
      </div>

    </div>
  );
}

export default AuthLayout;