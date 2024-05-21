const fileInput = document.querySelector("#imgFile");
const canvasInput = document.querySelector("#canvas");
const canvasCtx = canvas.getContext("2d");
const brightnessInput = document.querySelector("#brightness");
const saturationInput = document.querySelector("#saturation");
const blurInput = document.querySelector("#blur");
const inversionInput = document.querySelector("#inversion");

const setting = {};
let img = null;

function resetSetting() {
  setting.brightness = "150";
  setting.saturation = "150";
  setting.blur = "0";
  setting.inversion = "0";

  brightnessInput.value = setting.brightness;
  saturationInput.value = setting.saturation;
  blurInput.value = setting.blur;
  inversionInput.value = setting.inversion;
}

function generateFilter() {
  const { brightness, saturation, blur, inversion } = setting;

  return `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) invert(${inversion}%)`;
}

function renderImage() {
  canvas.width = image.width;
  canvas.height = image.height;

  canvasCtx.filter = generateFilter();
  canvasCtx.drawImage(image, 0, 0);
}

function updateSetting(key, value) {
  if (!image) return;
  setting[key] = value;
  renderImage();
}

brightnessInput.addEventListener("change", () => {
  updateSetting("brightness", brightnessInput.value);
});
blurInput.addEventListener("change", () => {
  updateSetting("blur", blurInput.value);
});
saturationInput.addEventListener("change", () => {
  updateSetting("saturation", saturationInput.value);
});
inversionInput.addEventListener("change", () => {
  updateSetting("inversion", inversionInput.value);
});

fileInput.addEventListener("change", () => {
  image = new Image();

  image.addEventListener("load", () => {
    resetSetting();
    renderImage();
  });

  image.src = URL.createObjectURL(fileInput.files[0]);
});

resetSetting();
