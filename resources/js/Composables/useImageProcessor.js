import { ref } from 'vue';

export function useImageProcessor() {
    const isProcessing = ref(false);
    const processedImages = ref([]);
    const progress = ref(0);

    const convertImage = async (file, targetFormat, quality = 0.92) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    
                    canvas.toBlob((blob) => {
                        const convertedFile = new File([blob], 
                            file.name.replace(/\.[^/.]+$/, `.${targetFormat}`),
                            { type: `image/${targetFormat}` }
                        );
                        resolve(convertedFile);
                    }, `image/${targetFormat}`, quality);
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const compressImage = async (file, quality = 0.7) => {
        const format = file.type.split('/')[1];
        return await convertImage(file, format, quality);
    };

    const resizeImage = async (file, width, height, maintainAspect = true) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    
                    if (maintainAspect) {
                        const ratio = Math.min(width / img.width, height / img.height);
                        canvas.width = img.width * ratio;
                        canvas.height = img.height * ratio;
                    } else {
                        canvas.width = width;
                        canvas.height = height;
                    }
                    
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    
                    const format = file.type.split('/')[1];
                    canvas.toBlob((blob) => {
                        const resizedFile = new File([blob], file.name,
                            { type: file.type }
                        );
                        resolve(resizedFile);
                    }, file.type, 0.92);
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const rotateImage = async (file, degrees) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const rad = degrees * Math.PI / 180;
                    
                    if (degrees === 90 || degrees === 270) {
                        canvas.width = img.height;
                        canvas.height = img.width;
                    } else {
                        canvas.width = img.width;
                        canvas.height = img.height;
                    }
                    
                    const ctx = canvas.getContext('2d');
                    ctx.translate(canvas.width / 2, canvas.height / 2);
                    ctx.rotate(rad);
                    ctx.drawImage(img, -img.width / 2, -img.height / 2);
                    
                    canvas.toBlob((blob) => {
                        const rotatedFile = new File([blob], file.name,
                            { type: file.type }
                        );
                        resolve(rotatedFile);
                    }, file.type, 0.92);
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const imageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const base64ToImage = (base64, filename = 'image.png') => {
        const arr = base64.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const downloadFile = (file) => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const downloadFiles = (files) => {
        files.forEach((file, index) => {
            setTimeout(() => {
                downloadFile(file);
            }, index * 100);
        });
    };

    return {
        isProcessing,
        processedImages,
        progress,
        convertImage,
        compressImage,
        resizeImage,
        rotateImage,
        imageToBase64,
        base64ToImage,
        downloadFile,
        downloadFiles
    };
}
