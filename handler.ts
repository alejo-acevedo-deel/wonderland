import { checkJobWork } from "./tasks/checkJobWork";

export const hello = async (event) => {
  try {
    await checkJobWork();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Check job work executed correctly",
      }),
    };
  } catch (e) {
    return {
      statusCode: e.httpCode || 500,
      body: JSON.stringify({
        message: e.message || 'Unexpected Error',
        codeError: e.codeError
      }),
    };
  }
};
