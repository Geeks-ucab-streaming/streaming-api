import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetArtistId = createParamDecorator(
  (_data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    // if (!request.user) throw new InvalidSessionException();
    if (!request.user) throw new Error('Method not implemented.');
    return request.user.patientId;
  },
);
