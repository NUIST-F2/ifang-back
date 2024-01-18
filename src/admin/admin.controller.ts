import { Controller, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
@Controller('admin')
export class AdminController {
    constructor(private readonly profilePermissionService: AdminService) { }

    @Post(':profileId/permissions/:permissionId')
    async associateProfileWithPermission(
        @Param('profileId') profileId: number,
        @Param('permissionId') permissionId: number,
    ) {
        await this.profilePermissionService.associateProfileWithPermission(profileId, permissionId);
        return { success: true };
    }


}

