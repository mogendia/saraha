import multer from 'multer';

export const fileValidation = {
    image: ['image/jpeg', 'image/png', 'image/gif'],
    file: ['application/pdf', 'application/msword'],
    video: ['video/mp4']
}

function uploadFile(customValidation=[]){
  

    const storage = multer.diskStorage({})
    function filterFile(req,file,cb){
        if (customValidation.includes(file.mimetype)){ 
            cb(null,true)
        }else{ 
            cb('In-Valid File',false)
            
        }
    }
    const upload = multer({filterFile,storage})
    return upload
}

export default uploadFile