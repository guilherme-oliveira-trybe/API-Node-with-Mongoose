import { ZodError } from 'zod';

const mapErrorZod = ({ issues }: ZodError) => {
  const errorMaped = issues.map((error) => ({ field: error.path[0], message: error.message }));

  return errorMaped;
};

export default mapErrorZod;
