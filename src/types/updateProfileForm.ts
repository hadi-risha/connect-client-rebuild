export type ProfileUpdateFormData = {
  name: string;
  instructorProfile?: {
    bio: string;
    expertise: string;
  };
  imageFile?: File;
  removePhoto?: boolean;
};
