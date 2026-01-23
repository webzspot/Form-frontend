/**
 * This is the script that users will copy and paste
 * It creates a div and iframe, and loads your public form
 * It can override colors, font, and width using data-* attributes
 */

(function () {
  // The <script> tag that included this script
  const script = document.currentScript;

  // Read data attributes from the script
  const formId = script.dataset.formId;               // REQUIRED: your form slug/id
  const primaryColor = script.dataset.primaryColor || "#7C3AED";
  const bgColor = script.dataset.bgColor || "#ffffff";
  const font = script.dataset.font || "Inter";
  const width = script.dataset.width || "100%";
  const inputBgColor = script.dataset.inputBgColor || "#ffffff";
const labelColor = script.dataset.labelColor || "#374151";
const borderRadius = script.dataset.borderRadius || "16px";


  if (!formId) {
    console.error("Form ID is required for the embed script");
    return;
  }

  // Create a container div
  const container = document.createElement("div");
  container.style.width = width;
  container.style.margin = "0 auto";

  // Create iframe to load the actual public form
  const iframe = document.createElement("iframe");

 




  iframe.src =
    `http://localhost:5173/public/form/${formId}` +
    `?primaryColor=${encodeURIComponent(primaryColor)}` +
    `&bgColor=${encodeURIComponent(bgColor)}` +
    `&font=${encodeURIComponent(font)}` +
    
  iframe.style.width = "100%";
  iframe.style.border = "none";

  // Adjust iframe height dynamically
  iframe.onload = () => {
    try {
      iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
    } catch (e) {
      // Ignore cross-origin issues if any
      iframe.style.height = "700px"; 
    }
  };

  container.appendChild(iframe);

  // Insert the iframe container before this script tag
  script.parentNode.insertBefore(container, script);
})();
