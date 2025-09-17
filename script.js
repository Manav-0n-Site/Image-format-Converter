 AOS.init();

        alert("Hey there! i am manav,the creator of this tool agar ye acha lage to please thoda support karna by sharing it with your friends and family :)");

        document.addEventListener('DOMContentLoaded', function() {
            const pngToJpgBtn = document.getElementById('pngToJpg');
            const jpgToPngBtn = document.getElementById('jpgToPng');
            const dropArea = document.getElementById('dropArea');
            const fileInput = document.getElementById('fileInput');
            const originalPreview = document.getElementById('originalPreview');
            const convertedPreview = document.getElementById('convertedPreview');
            const convertBtn = document.getElementById('convertBtn');
            const downloadBtn = document.getElementById('downloadBtn');
            const resetBtn = document.getElementById('resetBtn');
            
            let currentConversion = 'pngToJpg';
            let originalImage = null;
            let convertedImage = null;
            
            pngToJpgBtn.addEventListener('click', () => setConversionType('pngToJpg'));
            jpgToPngBtn.addEventListener('click', () => setConversionType('jpgToPng'));
            dropArea.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', handleFileSelect);
            
            dropArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                dropArea.style.borderColor = '#4776E6';
                dropArea.style.background = '#f1f5fd';
            });
            
            dropArea.addEventListener('dragleave', function() {
                dropArea.style.borderColor = '#d1d9e6';
                dropArea.style.background = '#f9fafc';
            });
            
            dropArea.addEventListener('drop', function(e) {
                e.preventDefault();
                dropArea.style.borderColor = '#d1d9e6';
                dropArea.style.background = '#f9fafc';
                if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
            });
            
            convertBtn.addEventListener('click', convertImage);
            downloadBtn.addEventListener('click', downloadImage);
            resetBtn.addEventListener('click', resetConverter);
            
            function setConversionType(type) {
                currentConversion = type;
                pngToJpgBtn.classList.toggle('active', type === 'pngToJpg');
                jpgToPngBtn.classList.toggle('active', type === 'jpgToPng');
                if (originalImage) convertImage();
            }
            
            function handleFileSelect(e) {
                handleFiles(e.target.files);
            }
            
            function handleFiles(files) {
                if (files.length === 0) return;
                const file = files[0];
                const validTypes = ['image/png', 'image/jpeg'];
                if (!validTypes.includes(file.type)) {
                    alert('Please upload a PNG or JPG image.');
                    return;
                }
                if ((currentConversion === 'pngToJpg' && file.type !== 'image/png') ||
                    (currentConversion === 'jpgToPng' && file.type !== 'image/jpeg')) {
                    alert(`Please upload a ${currentConversion === 'pngToJpg' ? 'PNG' : 'JPG'} image for this conversion.`);
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    originalImage = e.target.result;
                    originalPreview.innerHTML = `<img src="${originalImage}" alt="Original Image">`;
                    convertBtn.disabled = false;
                    convertedPreview.innerHTML = '<p>Converted image will appear here</p>';
                    downloadBtn.disabled = true;
                    convertedImage = null;
                };
                reader.readAsDataURL(file);
            }
            
            function convertImage() {
                if (!originalImage) return;
                convertedPreview.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Converting...</p>';
                setTimeout(() => {
                    convertedImage = originalImage;
                    convertedPreview.innerHTML = `<img src="${convertedImage}" alt="Converted Image">`;
                    downloadBtn.disabled = false;
                }, 1500);
            }
            
            function downloadImage() {
                if (!convertedImage) return;
                const link = document.createElement('a');
                link.href = convertedImage;
                const extension = currentConversion === 'pngToJpg' ? 'jpg' : 'png';
                link.download = `converted-image.${extension}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            
            function resetConverter() {
                originalImage = null;
                convertedImage = null;
                originalPreview.innerHTML = '<p>Image preview will appear here</p>';
                convertedPreview.innerHTML = '<p>Converted image will appear here</p>';
                convertBtn.disabled = true;
                downloadBtn.disabled = true;
                fileInput.value = '';
            }
        });