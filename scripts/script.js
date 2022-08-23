let scale = 1;

const previewImg = document.querySelector('.preview-img'),
  fileInput = document.querySelector('#fileInput'),
  addButton = document.querySelector('.add-size'),
  inputs = document.querySelectorAll('.scale-input'),
  btnDownload = document.querySelector('#download');

previewImg.addEventListener('click', handleImage);
fileInput.addEventListener('change', loadImage);
inputs.forEach((input) => {
  input.addEventListener('change', handleInputChange);
});
btnDownload.addEventListener('click', handleDownload);

function handleImage() {
  fileInput.click();
}

function loadImage(e) {
  const file = e.target.files[0];
  if (!file) return;
  scale = 1;
  let img = new Image();
  const src = URL.createObjectURL(file);
  previewImg.src = src;
  img.src = src;

  img.onload = function (e) {
    const imgLabel = document.querySelector('.original-size');
    imgLabel.innerText = `Original size: ${this.width}x${this.height}`;
    document.querySelector('.form-disabled')?.classList.remove('form-disabled');
    setInputs();
  };
}

function handleInputChange(e) {
  const { naturalWidth: width, naturalHeight: height } = previewImg;
  const { id, value } = e.target;
  if (id === 'scale') {
    scale = value / 100;
  }
  if (id === 'width') {
    scale = value / width;
  }
  if (id === 'height') {
    scale = value / height;
  }
  setInputs();
}

function setInputs() {
  const previewImg = document.querySelector('.preview-img');
  const scaleInput = document.querySelector('#scale');
  const widthInput = document.querySelector('#width');
  const heightInput = document.querySelector('#height');
  const scaleLabel = document.querySelector('#scale-label');
  scaleInput.value = scale * 100;
  widthInput.value = parseInt(scale * previewImg.naturalWidth);
  heightInput.value = parseInt(scale * previewImg.naturalHeight);
  scaleLabel.innerText = `scale ${scale.toFixed(2)}`;
}

function handleDownload() {
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  let img = new Image();
  img.src = previewImg.src;
  img.addEventListener('load', function () {
    const scaledWidth = previewImg.naturalWidth * scale,
      scaledHeight = previewImg.naturalHeight * scale;
    canvas.width = scaledWidth;
    canvas.height = scaledHeight;
    ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
    let link = document.createElement('a');
    link.download = 'scaled-img';
    link.href = canvas.toDataURL();
    link.click();
  });
}
