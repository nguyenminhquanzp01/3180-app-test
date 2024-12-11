import React from "react";
import BreadCrumb from "@/components/ui/breadcrumb";
import { ChangePasswordForm } from "@/components/page-component/manage/account/change-password-form";
import { Button } from "@/components/ui/button";
import DeleteUser from "@/components/page-component/manage/account/delete-user";

const breadcrumbItems = [{ title: 'Đổi mật khẩu', link: '/manage/account' }];
const Account = () => {
    

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 md:p-8">
                <BreadCrumb items={breadcrumbItems} />
                <ChangePasswordForm />
                <DeleteUser/>
            </div>
        </div>
    );
};

export default Account;
