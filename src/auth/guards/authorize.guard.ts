import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { REQUEST_USER_KEY } from "src/constants/contants";
import { JweService } from "../jwe.service";

@Injectable()
export class AuthorizeGuard implements CanActivate {
    constructor(private readonly jweService: JweService,
        private readonly reflector: Reflector
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass()
        ])

        if (isPublic) return true;

        const request: Request = context.switchToHttp().getRequest();
        const auth = request.headers.authorization;
        if (!auth?.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or invalid Authorization header');
        }

        const token = auth.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException()
        }

        try {
            const payload = await this.jweService.decrypt(token);
            request[REQUEST_USER_KEY] = payload;
        } catch (error) {
            throw new UnauthorizedException()
        }

        return true
    }
}