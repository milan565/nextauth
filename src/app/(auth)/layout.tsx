import React from "react";
type tprops = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: tprops) => {
  return (
    <div className="py-[60px] w-full h-screen">
      <div className="w-[400px] mx-auto rounded-md bg-zinc-300 py-[10px] px-[30px]">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
