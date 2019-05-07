export default $http => {
  return {
    state: {
      message: "About State",
      mock: "No Mock"
    },
    actions: {
      getMock(ctx) {
        $http
          .auto("/mock/home!post", { a: 1 })
          .then(response => (ctx.state.mock = response.data));
      }
    }
  };
};
