import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserCreateDto } from './dtos/user-create.dto';
import { userAlreadyExitsException } from 'src/CustomException/user-already-exits.exception';
import { HashingProvider } from './provider/hashing.provider';

@Injectable()
export class UsersService {

    constructor(private prismaService: PrismaService,
        @Inject(forwardRef(() => HashingProvider))
        private readonly hashProvider: HashingProvider
    ) { }

    async createUser(createUser: UserCreateDto) {
        try {
            const isExistingWithUserName = await this.prismaService.user.findFirst({
                where: { name: createUser.name }
            })

            if (isExistingWithUserName) {
                throw new userAlreadyExitsException('name', createUser.name);
            }

            const isExistingWithEmail = await this.prismaService.user.findUnique({
                where: { email: createUser.email }
            })

            if (isExistingWithEmail) {
                throw new userAlreadyExitsException('email', createUser.email);
            }

            const avatar_pic = createUser.gender === "male" ? `https://avatar.iran.liara.run/public/boy?username=${createUser?.name}` : `https://avatar.iran.liara.run/public/gril?username=${createUser?.name}`;
            createUser.avatar_img = avatar_pic;
            const user = await this.prismaService.user.create({
                data: { ...createUser, password: await this.hashProvider.hashPassword(createUser.password) }
            });
            const response = {
                name: user.name,
                email: user.email,
                gender: user.gender,
                is_active: user.is_active
            }
            return response;
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                throw new RequestTimeoutException('An error has occurred, please try again later', {
                    description: 'Could not connect to database'
                })
            }

            throw error;
        }
    }

    async getUser(user_id: string){
        try{

            const user = await this.prismaService.user.findFirst({where: {id: user_id}});
            if(!user){
                throw new NotFoundException(`user is not found with the given user Id: ${user_id}`);                
            }

            return {
                message: "user data found",
                data: user
            }

        } catch(error){
            throw new BadRequestException("fetching user details failed...")
        }
    }
}
