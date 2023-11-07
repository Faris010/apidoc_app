import { storage } from '@/firebase/Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export const UploadImageToStorage = async (
  imageFile: File
): Promise<string> => {
  const imageRef = ref(storage, `images/${imageFile.name}${uuidv4()}`);
  await uploadBytes(imageRef, imageFile);
  const url = await getDownloadURL(imageRef);
  return url;
};
