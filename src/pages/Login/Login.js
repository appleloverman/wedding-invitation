import React from "react";

function Login() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-16 text-center">
      <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 text-red-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2v20m10-10H2" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold mb-2">로그인에 실패하였습니다</h1>
      <p className="text-sm text-gray-600 mb-4">
        서버에 이용자가 많아 로그인에 실패하였습니다. 문제가 지속되면 고객센터에
        문의해주세요.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="inline-block px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
      >
        다시 시도
      </button>
    </section>
  );
}

export default Login;
