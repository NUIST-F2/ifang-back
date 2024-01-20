import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { Permission } from 'src/entities/permission.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async associateProfileWithPermission(profileId: number, permissionId: number): Promise<void> {
        const profile = await this.profileRepository.findOne({ where: { id: profileId } });
        const permission = await this.permissionRepository.findOne({ where: { pmid: permissionId } });

        if (!profile || !permission) {
            throw new NotFoundException('Profile or Permission not found');
        }

        // Add the permission to the profile
        profile.permissions = [...(profile.permissions || []), permission];

        // Save the updated profile
        await this.profileRepository.save(profile);
    }//给予权限操作，仅有管理员可用，未测试
    async getPermissionIdsForProfile(profileId: number): Promise<number[]> {
        const profile = await this.profileRepository.findOne({
            where: { id: profileId },
            relations: ['permission'],
        });

        if (!profile) {
            return [];
        }

        return profile.permissions.map(permission => permission.pmid);
    }

    async getProfileIdsForPermission(permissionId: number): Promise<number[]> {
        const permission = await this.permissionRepository.findOne({
            where: { pmid: permissionId },
            relations: ['profile'],
        });

        if (!permission) {
            return [];
        }

        return permission.profile.map(profile => profile.id);
        //以上两个返回参数未测试
    }

    async getProfileOfUser(name: string): Promise<Profile> {
        const user = await this.userRepository.findOne({
            where: { username: name },
            relations: ['profile'],
        });

        if (!user) {
            throw new NotFoundException('User not found');;
        }

        return user.profile;
    }//待测试











}
