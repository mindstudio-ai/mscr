export interface AddGroupMembersInputs {
  groupId: string;
  memberEmails: string;
  outputVariable: string;
}

export interface GroupMember {
  email: string;
}
