import { checkJobWorkHandler } from "./tasks/checkJobWork";

export const checkJobExecution = async (event) => {
  try {
    await checkJobWorkHandler();

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
