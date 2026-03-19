import React, { useState, useEffect } from "react";
import { FaCopy, FaCheck, FaTerminal, FaShieldAlt, FaServer, FaDatabase, FaCode } from "react-icons/fa";
import UserNavbar from "./UserNavbar";
import WaveBackground from "../dashboard/WaveBackground";
import { useFormContext } from "../dashboard/FormContext";
import {motion} from "framer-motion"


const CodeBlock = ({ code, isDarkMode }) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-4">
      <button
        onClick={copyToClipboard}
        className={`absolute right-4 top-4 p-2 rounded-lg text-sm transition-all z-10 ${
          isDarkMode ? "bg-white/10 hover:bg-white/20" : "bg-purple-800/10 hover:bg-purple-800/20"
        }`}
      >
        {copied ? <FaCheck className="text-green-500" /> : <FaCopy className="text-purple-400" />}
      </button>
      <pre className={`p-6 rounded-2xl font-mono text-sm overflow-x-auto border leading-relaxed ${
        isDarkMode ? "bg-black/60 border-purple-500/20 text-purple-300" : "bg-[#1e1b4b] border-slate-700 text-purple-100"
      }`}>
        {code}
      </pre>
    </div>
  );
};

const SectionHeader = ({ icon: Icon, title, subtitle, color = "text-purple-500",isDarkMode }) => (
  <div className="mb-6">
    <div className={`flex items-center gap-3 font-black text-sm tracking-widest uppercase ${color}`}>
      <Icon size={20} /> <span>{subtitle}</span>
    </div>
    <h2 className={`text-xl sm:text-2xl mt-2 font-extrabold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
{title}</h2>
  </div>
);
  
const MethodBadge = ({ method }) => {
  const styles = {
    GET: "bg-green-500/10 text-green-400 border border-green-500/20",
    POST: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  };

  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-bold tracking-wide ${styles[method]}`}
    >
      {method}
    </span>
  );
};



 const SparkleIcon = ({ className }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
    );

const ApiReference = () => {
  const { isDarkMode } = useFormContext();
  const [activeId, setActiveId] = useState("");

  const theme = {
    pageBg: isDarkMode
  ? "bg-[#05070f] text-white selection:bg-purple-500/30"
  : "bg-[#fdfaff] text-slate-900",

   sidebar: isDarkMode
  ? "bg-[#080a14]/80  backdrop-blur-xl border-r border-purple-500/10"
  : "bg-white border-r border-purple-100",

     card: isDarkMode
  ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.05)]"
  : "bg-white/80 border border-purple-100 shadow-xl backdrop-blur-md",

  textSub: isDarkMode
  ? "text-gray-200 leading-relaxed"
  : "text-slate-600 leading-relaxed",

    headerIcon: isDarkMode ? "text-purple-400" : "text-purple-600",
  };

  // Scroll spy for sidebar highlighting
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className={`${theme.pageBg} h-screen flex flex-col overflow-hidden font-sans transition-colors duration-500`}>
      <UserNavbar />

      <div className="flex flex-1 overflow-hidden relative">
       <div className="absolute inset-0 z-0 pointer-events-none">
                          <WaveBackground position="top" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />
                          <WaveBackground position="bottom" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />
                          
                         
                      </div>

          {isDarkMode && (
  <motion.div 
    animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }} 
    transition={{ duration: 4, repeat: Infinity }}
    className="absolute top-1/4 left-40 z-50 text-white-40"
  >
    <SparkleIcon className="w-8 h-8" />
  </motion.div>
)}


        {/* Sidebar */}
        <aside className={`${theme.sidebar} w-72 hidden lg:flex flex-col flex-shrink-0 z-20`}>
          <div className="p-8 overflow-y-auto custom-scrollbar space-y-4">
          <h2
  className={`text-sm font-bold uppercase mb-4 ${
    isDarkMode ? "text-purple-100" : "text-purple-600"
  }`}
>
  API Documentation
</h2>

            {[
              { id: "overview", label: "Overview" },
              { id: "base-url", label: "Base URL" },
              { id: "auth", label: "Authentication" },
              { id: "get-form", label: "Get Form Details" },
              { id: "post-submit", label: "Submit Form Data" },
              { id: "get-responses", label: "Fetch All Responses" },
            ].map((item) => (
//               <a
//                 key={item.id}
//                 href={`#${item.id}`}
//                 className={`block px-2 py-1 rounded transition-colors ${
//   activeId === item.id
//     ? "bg-purple-500/20 text-purple-400 font-semibold"
//     : isDarkMode
//       ? "text-white hover:bg-purple-500/10"
//       : "text-slate-600 hover:bg-purple-200/10"
// }`}

//               >
//                 {item.label}
//               </a>
<a
  key={item.id}
  href={`#${item.id}`}
  className={`block px-4 py-2 rounded-l-lg transition-all duration-200 border-l-4 ${
    activeId === item.id
      ? "border-purple-500 bg-purple-50 text-purple-600 font-semibold"
      : isDarkMode
        ? "text-white hover:bg-purple-500/10 border-transparent"
        : "text-gray-800 hover:bg-gray-100 border-transparent"
  }`}
>
  {item.label}
</a>

            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto scroll-smooth z-10 custom-scrollbar px-6 sm:px-12 py-12 space-y-12">
          
          {/* Overview */}
          <motion.section id="overview" className={`${theme.card} p-6 rounded-2xl space-y-4`}  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}

  

  viewport={{ once: true }}>
            <SectionHeader icon={FaCode} title="API Overview" subtitle="Integration Guide" color={theme.headerIcon}   isDarkMode={isDarkMode} />
            <p className={theme.textSub}>
              These endpoints are designed for developers who want to integrate the Form SaaS platform into their own backend systems, such as syncing data automatically or powering custom mobile applications. The API provides complete control over form retrieval, submission, and response management.
            </p>
            <p className={theme.textSub}>
              Before calling any endpoint, ensure that authentication headers are included and that you are using the correct base URL. Proper implementation of these APIs allows developers to automate workflows, maintain data integrity, and integrate seamlessly with third-party tools or internal dashboards.
            </p>
          </motion.section>

          {/* Base URL */}
          <motion.section id="base-url" className={`${theme.card} p-6 rounded-2xl space-y-4`}  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}

  viewport={{ once: true }}>
            <SectionHeader icon={FaServer} title="Base URL" subtitle="Request Entry Point" color={theme.headerIcon}    isDarkMode={isDarkMode}/>
            <p className={theme.textSub}>
              All API requests must start with the base URL, which acts as the root for all endpoints. Appending the correct endpoint paths to this URL ensures successful communication with the backend.
            </p>
            <CodeBlock isDarkMode={isDarkMode} code={`baseurl/api/v1`} />
          </motion.section>

          {/* Authentication */}
          <motion.section id="auth" className={`${theme.card} p-6 rounded-2xl space-y-4`}  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.1 }}

  viewport={{ once: true }}>
            <SectionHeader icon={FaShieldAlt} title="Authentication" subtitle="Security Protocol" color={theme.headerIcon}   isDarkMode={isDarkMode}/>
            <p className={theme.textSub}>
              All requests must include the following headers:
            </p>
            <ul className="list-disc ml-6 text-sm space-y-1">
              <li><strong>x-api-key:</strong> Public key identifying your organization.</li>
              <li><strong>x-api-secret:</strong> Private key for authorizing read/write operations.</li>
            </ul>
            <p className={theme.textSub}>
              Missing or invalid keys result in <strong>401 Unauthorized</strong> or <strong>403 Forbidden</strong> errors. Keep the secret key confidential.
            </p>
          </motion.section>

          {/* GET Form */}
       <motion.section
  id="get-form"
  className={`${theme.card} p-6 rounded-2xl space-y-4`}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
  viewport={{ once: true }}
>
  <SectionHeader
    icon={FaDatabase}
    title="Get Form Details"
    subtitle="Form Structure"
    color={theme.headerIcon}
    isDarkMode={isDarkMode}
  />

  <p className={theme.textSub}>
    Retrieve the structure of a specific form. This endpoint returns the form title and all form fields including their types.
  </p>

  <h4 className="font-bold">Request</h4>
  <div className="flex items-center gap-2 text-sm">
    <MethodBadge method="GET" />
    <code>/forms/:formId</code>
  </div>

  <CodeBlock
    isDarkMode={isDarkMode}
    code={`import axios from "axios";

axios.get("https://baseurl/api/v1/forms/uuid-123", {
  headers: {
    "x-api-key": "your_public_key",
    "x-api-secret": "your_secret_key"
  }
})
.then(res => console.log(res.data))
.catch(err => console.error(err));`}
  />

  <h4 className="font-bold mt-4">Response</h4>
  <CodeBlock
    isDarkMode={isDarkMode}
    code={`{
  "success": true,
  "data": {
    "formId": "uuid-123",
    "formTitle": "Customer Survey",
    "fields": [
      { "id": "field-uuid-1", "label": "What is your name?", "type": "TEXT" },
      { "id": "field-uuid-2", "label": "Rate us", "type": "RATING" }
    ]
  }
}`}
  />

  <h4 className="font-bold text-red-500 mt-4">Errors</h4>
  <ul className="list-disc ml-6 text-sm space-y-1">
    <li>404 Not Found: Form does not exist.</li>
    <li>401 Unauthorized: Invalid API/Secret key.</li>
    <li>500 Internal Server Error: Server-side processing error.</li>
  </ul>
</motion.section>



          {/* POST Submit */}
          <motion.section id="post-submit" className={`${theme.card} p-6 rounded-2xl space-y-4`}  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.1 }}

  viewport={{ once: true }}>
            <SectionHeader icon={FaTerminal} title="Submit Form Data" subtitle="Server-Side Submission" color={theme.headerIcon}     isDarkMode={isDarkMode}/>
            <p className={theme.textSub}>
              Programmatically submit user responses to a form. Each response must map to a valid <code>formFieldId</code> from the Get Form Details endpoint.
            </p>
            <h4 className="font-bold">Request</h4>
            <div className="flex items-center gap-2 text-sm">
  <MethodBadge method="POST" />
 <code>/forms/:formId/submit</code>

</div><CodeBlock
  isDarkMode={isDarkMode}
  code={`import axios from "axios";

axios.post("https://baseurl/api/v1/forms/uuid-123/submit", {
  responses: [
    { formFieldId: "field-uuid-1", value: "John Doe" },
    { formFieldId: "field-uuid-2", value: "5" }
  ]
}, {
  headers: {
    "x-api-key": "your_public_key",
    "x-api-secret": "your_secret_key"
  }
})
.then(res => {
  console.log(res.data);
})
.catch(err => {
  console.error(err);
});`}
/>

            <h4 className="font-bold">Response</h4>
            <CodeBlock isDarkMode={isDarkMode} code={`{
  "success": true,
  "message": "Submission recorded successfully",
  "responseId": "uuid-response-999"
}`} />
            <h4 className="font-bold text-red-500">Errors</h4>
            <ul className="list-disc ml-6 text-sm space-y-1">
              <li>400 Bad Request: Validation failed.</li>
              <li>404 Not Found: Form ID invalid or unauthorized.</li>
              <li>401 Unauthorized: Invalid API/Secret key.</li>
              <li>500 Internal Server Error: Server processing failure.</li>
            </ul>
          </motion.section>

          {/* GET Responses */}
             <motion.section
  id="get-responses"
  className={`${theme.card} p-6 rounded-2xl space-y-4`}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
  viewport={{ once: true }}
>
  <SectionHeader
    icon={FaDatabase}
    title="Fetch All Responses"
    subtitle="Retrieve Submissions"
    color={theme.headerIcon}
    isDarkMode={isDarkMode}
  />

  <p className={theme.textSub}>
    Retrieves all responses for a specific form. You can see both the raw JSON response and a table preview for easier readability.
  </p>

  <h4 className="font-bold">Request</h4>
  <div className="flex items-center gap-2 text-sm">
    <MethodBadge method="GET" />
    <code>/forms/:formId/responses</code>
  </div>

  <CodeBlock
    isDarkMode={isDarkMode}
    code={`import axios from "axios";

axios.get("https://baseurl/api/v1/forms/uuid-123/responses", {
  headers: {
    "x-api-key": "your_public_key",
    "x-api-secret": "your_secret_key"
  }
})
.then(res => console.log(res.data))
.catch(err => console.error(err));`}
  />

  <h4 className="font-bold mt-4">Raw JSON Response</h4>
  <CodeBlock
    isDarkMode={isDarkMode}
    code={`{
  "success": true,
  "data": {
    "formTitle": "Customer Survey",
    "columns": [
      { "key": "field-uuid-1", "label": "What is your name?", "type": "TEXT" },
      { "key": "field-uuid-2", "label": "Rate us", "type": "RATING" }
    ],
    "rows": [
      { "id": "resp-001", "submittedAt": "2025-01-30T10:00:00.000Z", "field-uuid-1": "John Doe", "field-uuid-2": "5" },
      { "id": "resp-002", "submittedAt": "2025-01-30T11:30:00.000Z", "field-uuid-1": "Jane Smith", "field-uuid-2": "4" }
    ]
  }
}`}
  />

  <h4 className="font-bold mt-4">Table Preview</h4>
 <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
  <table className="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-700">
    {/* Table Head */}
    <thead className={`${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
      <tr>
        <th className={`px-4 py-2 font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>ID</th>
        <th className={`px-4 py-2 font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>Submitted At</th>
        <th className={`px-4 py-2 font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>Name</th>
        <th className={`px-4 py-2 font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>Rating</th>
      </tr>
    </thead>

    {/* Table Body */}
    <tbody className={`${isDarkMode ? "bg-gray-800" : "bg-white"} divide-y divide-gray-200 dark:divide-gray-700`}>
      {[
        { id: "resp-001", submittedAt: "2025-01-30 10:00", name: "John Doe", rating: 5 },
        { id: "resp-002", submittedAt: "2025-01-30 11:30", name: "Jane Smith", rating: 4 },
      ].map((row) => (
        <tr key={row.id}>
          <td className={`px-4 py-2 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>{row.id}</td>
          <td className={`px-4 py-2 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>{row.submittedAt}</td>
          <td className={`px-4 py-2 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>{row.name}</td>
          <td className={`px-4 py-2 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>{row.rating}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


  <h4 className="font-bold text-red-500 mt-4">Errors</h4>
  <ul className="list-disc ml-6 text-sm space-y-1">
    <li>404 Not Found: Form does not exist or unauthorized access.</li>
    <li>401 Unauthorized: Invalid or missing API/Secret key.</li>
    <li>500 Internal Server Error: Server-side processing error.</li>
  </ul>
</motion.section>

        </main>
      </div>
    </div>
  );
};

export default ApiReference;