// 检查是否使用了 pnpm 作为包管理器, 如果没有, 则提示用户并退出
// 这是为了确保在使用 pnpm 安装依赖时, 能�本能够正常运行
if (!/pnpm/.test(process.env.npm_execpath || "")) {
  console.warn(
    `\u001b[33mThis repository must using pnpm as the package manager ` +
      ` for scripts to work properly.\u001b[39m\n`,
  );
  process.exit(1);
}
