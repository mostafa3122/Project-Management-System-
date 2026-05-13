export default function AuthHeader({ title }) {
  return (
    <div className="auth-header mb-3">
      <h6 className="text-sm text-white">welcome to PMS</h6>
      <h2 className="text-[#EF9B28] font-bold text-xl md:text-[32px] flex flex-col leading-8">
        {title}
        <span className="w-4 h-1 bg-[#EF9B28]"></span>
      </h2>
    </div>
  );
}
