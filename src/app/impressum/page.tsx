import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum | Exhausted Rocket',
  description: 'Legal disclosure and contact information for Exhausted Rocket.',
};

export default function ImpressumPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Impressum</h1>
        <p className="text-xl text-muted-foreground mt-2">Legal Disclosure</p>
      </header>

      <section className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-semibold">Information according to § 5 TMG</h2>
        <p>
        Taberon UG (limited liability)<br />
        Franz-Joseph-Str. 11<br />
        80801 Munich <br />
        Germany
        </p>

        <h2 className="text-2xl font-semibold mt-6">Contact</h2>
        <p>
          Email: info@taberon.com
        </p>

        <h2 className="text-2xl font-semibold mt-6">Commercial Register</h2>
        <p>
        Registry court: Munich Local Court<br />
        Registration number: HRB 261454
        </p>

        <h2 className="text-2xl font-semibold mt-6">Represented by</h2>
        <p>
          Johannes Start
        </p>

        <h2 className="text-2xl font-semibold mt-6">Liability for Content</h2>
        <p>
          All content on our website has been created with the utmost care and to the best of our knowledge. 
          However, we cannot guarantee the accuracy, completeness, or timeliness of the content. 
          As a service provider, we are responsible for our own content on these pages according to § 7 para.1 TMG (German Telemedia Act). 
          According to §§ 8 to 10 TMG, however, we as a service provider are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. 
          Obligations to remove or block the use of information according to general laws remain unaffected.
        </p>
        <p>
          However, liability in this regard is only possible from the time of knowledge of a specific legal violation. 
          Upon becoming aware of the aforementioned legal violations, we will remove this content immediately.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Limitation of Liability for External Links</h2>
        <p>
          Our website contains links to external websites of third parties. We have no influence on the content of these directly or indirectly linked websites. 
          Therefore, we cannot guarantee the accuracy of the content of the &quot;external links&quot;. 
          The respective providers or operators (creators) of the pages are responsible for the content of the external links.
        </p>
        <p>
          The external links were checked for possible legal violations at the time the link was created and were free of illegal content at the time the link was set. 
          A continuous review of external links is not possible without concrete indications of a legal violation. 
          In the case of direct or indirect links to third-party websites that are outside our area of responsibility, a liability obligation would only exist if we became aware of the content and it would be technically possible and reasonable for us to prevent the use in the case of illegal content.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Copyright</h2>
        <p>
          The content and works published on our website are subject to German copyright law (
          <a href="http://www.gesetze-im-internet.de/bundesrecht/urhg/gesamt.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            http://www.gesetze-im-internet.de/bundesrecht/urhg/gesamt.pdf
          </a>). 
          The reproduction, editing, distribution, and any kind of exploitation of intellectual property in ideal and material view of the author outside the limits of copyright require the prior written consent of the respective author in the sense of copyright law.
        </p>
        <p>
          Downloads and copies of this page are only permitted for private and non-commercial use. 
          If the content on our website was not created by us, the copyrights of third parties must be observed. Third-party content is identified as such. 
          Should you nevertheless become aware of a copyright infringement, please inform us accordingly. 
          When we become aware of legal violations, we will remove such content immediately.
        </p>

    
      </section>
    </div>
  );
} 