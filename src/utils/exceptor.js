export default Global => {
  Global.onerror = (message, url, line, column, error) => (
    Global.Console.error(
      `${message}\n ${url}`,
      `line:${line} column:${column}`
    ),
    true
  );
};
