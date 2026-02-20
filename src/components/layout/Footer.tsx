"use client";

import { useMessages } from "next-intl";
import { usePrivacyModal } from "@/lib/privacy-modal-context";

interface FooterSection {
  title: string;
  links: string[];
}

interface FooterMessages {
  conditionMonitoring: FooterSection;
  cmms: FooterSection;
  oee: FooterSection;
  pricing: FooterSection;
  integrations: FooterSection;
  resources: FooterSection;
  company: FooterSection;
  downloadApp: FooterSection;
  privacyChoices: string;
  copyright: string;
  cnpj?: string;
  phone: string;
  address: string;
}

const badges = [
  { name: "Front Runners", src: "https://imgix.tractian.com/website/components/footer/v2/front-runners.png?auto=format%2Ccompress&cs=origin&fit=max&q=75&w=384", className: "w-11" },
  { name: "Forbes AI", src: "https://imgix.tractian.com/website/components/footer/v2/forbes-ai.png?auto=format%2Ccompress&cs=origin&fit=max&q=75&w=384", className: "w-14" },
  { name: "AICPA", src: "https://imgix.tractian.com/website/components/footer/v2/aicpa-soc.png?auto=format%2Ccompress&cs=origin&fit=max&q=75&w=384", className: "w-12" },
  { name: "SAP Partner", src: "https://imgix.tractian.com/website/components/footer/v2/sap-partner.png?auto=format%2Ccompress&cs=origin&fit=max&q=75&w=640", className: "w-16" },
  { name: "ISO 27001", src: "https://imgix.tractian.com/website/components/footer/v2/BadgeISO27001.png?auto=format%2Ccompress&cs=origin&fit=max&q=75&w=640", className: "w-14" },
  { name: "Oracle Cloud", src: "https://imgix.tractian.com/website/components/footer/v2/oracle-cloud.png?auto=format%2Ccompress&cs=origin&fit=max&q=75&w=384", className: "w-14" },
  { name: "ISO 9001", src: "https://imgix.tractian.com/website/components/footer/v2/iso-9001.png?auto=format%2Ccompress&cs=origin&fit=max&q=75&w=384", className: "w-11" },
  { name: "Best Meets Requirements", src: "https://imgix.tractian.com/website/components/footer/v2/asset-management-best-meets-requirements.png?auto=format%2Ccompress&cs=origin&fit=max&q=75&w=384", className: "w-11" },
];

function TractianLogoFooter() {
  return (
    <svg className="w-28 h-8 lg:h-12 lg:w-36" fill="rgb(37, 99, 235)" viewBox="0 0 177 25">
      <path
        d="M62.458 0.843088L72.7058 23.9849H65.8867L64.0604 19.4754L62.16 14.6309L59.1789 7.21453L56.1977 14.6309L54.2973 19.4754L52.471 23.9849H45.7631L56.011 0.843088H62.458ZM42.4099 13.8112C43.1926 12.5437 43.6018 11.0909 43.6018 9.41432C43.6018 7.7377 43.1541 6.1723 42.3344 4.8678C41.4775 3.56331 40.2842 2.59523 38.7573 1.88669C37.1919 1.17814 35.3656 0.843088 33.3169 0.843088H22.734V5.98555H32.9077C34.2122 5.98555 35.2558 6.28353 35.9629 6.87948C36.6344 7.47543 37.0065 8.33227 37.0065 9.37587C37.0065 10.4195 36.6344 11.2763 35.9629 11.8723C35.2544 12.4682 34.2492 12.7291 32.9077 12.7291H22.734V23.9464H29.2921V17.7974H32.8692L37.0807 23.9464H44.0865L39.0566 16.7181C40.4724 16.0096 41.5901 15.0786 42.4099 13.8112ZM176.492 0.843088H170.082L170.045 7.4768L176.455 15.2283L176.492 0.843088ZM81.3869 6.54443C82.3934 6.02263 83.5112 5.72465 84.7786 5.72465C86.9029 5.72465 88.7292 6.65565 90.219 8.44487L94.3934 4.68106C93.2757 3.30241 91.8599 2.18466 90.1449 1.43904C88.4312 0.693414 86.5307 0.321289 84.4065 0.321289C81.9471 0.321289 79.7858 0.843088 77.8483 1.88669C75.9478 2.93028 74.4195 4.34601 73.3018 6.13523C72.184 7.9986 71.6622 10.0487 71.6622 12.3584C71.6622 14.668 72.184 16.7552 73.3018 18.5815C74.4195 20.3707 75.9478 21.7864 77.8483 22.793C79.7487 23.8366 81.9471 24.3213 84.4065 24.3213C86.5307 24.3213 88.3941 23.9492 90.1449 23.2035C91.8215 22.4579 93.2386 21.3772 94.3934 19.9615L90.219 16.1977C88.6907 18.024 86.8644 18.9179 84.7786 18.9179C83.5112 18.9179 82.3934 18.657 81.3869 18.0982C80.3804 17.5764 79.6348 16.7937 79.1143 15.7871C78.5939 14.7806 78.3316 13.6258 78.3316 12.3213C78.3316 11.0168 78.5925 9.86197 79.1143 8.89252C79.6361 7.886 80.4188 7.1033 81.3869 6.54443ZM0 6.02263H7.11844V23.9849H13.6766V6.02263H20.7566V0.843088H0V6.02263ZM154.505 23.9849H160.915L160.952 17.0532L154.542 8.89252L154.505 23.9849ZM136.356 0.843088L126.145 23.9849H132.816L134.642 19.4754L136.542 14.6309L139.524 7.21453L142.505 14.6309L144.405 19.4754L146.231 23.9849H153.05L142.803 0.843088H136.356ZM170.082 13.1781L159.871 0.843088H154.468V3.93543L160.877 11.6869L171.088 24.0219H176.492V21.3388L170.082 13.1781ZM118.133 23.9849H124.691V0.843088H118.133V23.9849ZM95.437 6.02263H102.518V23.9849H109.077V6.02263H116.157V0.843088H95.437V6.02263Z"
        fill="rgb(37, 99, 235)"
      />
    </svg>
  );
}

function LinkGroup({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="flex-col pb-4 flex w-full gap-2 lg:pb-0">
      <p className="font-bold">{title}</p>
      {links.map((link) => (
        <a key={link} href="#" className="hover:text-blue-600 transition-colors">
          {link}
        </a>
      ))}
    </div>
  );
}

export function Footer() {
  const messages = useMessages();
  const f = (messages as unknown as { footer: FooterMessages }).footer;
  const { open: openPrivacyModal } = usePrivacyModal();

  return (
    <footer className="bg-slate-100 py-12 px-4 xl:pl-0 xl:pr-0">
      <div className="flex-col flex w-full max-w-[72rem] gap-12 m-auto">
        <div className="flex-col flex w-full gap-4 sm:flex-row sm:items-center sm:justify-between">
          <figure className="hidden w-auto shrink-0 sm:flex">
            <TractianLogoFooter />
          </figure>
          <div className="items-center flex flex-wrap w-full gap-3 sm:gap-5 sm:justify-end">
            {badges.map((badge) => (
              <figure key={badge.name} className="items-center justify-center flex h-12 sm:h-14">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={`object-contain h-auto max-w-full ${badge.className}`}
                  src={badge.src}
                  alt={badge.name}
                />
              </figure>
            ))}
          </div>
        </div>

        <div className="flex-col flex w-full gap-16 text-sm text-slate-500 sm:flex-row sm:justify-between">
          <div className="flex-col flex w-full gap-8">
            <LinkGroup title={f.conditionMonitoring.title} links={f.conditionMonitoring.links} />
            <LinkGroup title={f.oee.title} links={f.oee.links} />
          </div>

          <div className="flex-col flex w-full gap-8">
            <LinkGroup title={f.cmms.title} links={f.cmms.links} />
            <LinkGroup title={f.pricing.title} links={f.pricing.links} />
          </div>

          <div className="flex-col flex w-full gap-8">
            <LinkGroup title={f.integrations.title} links={f.integrations.links} />
            <LinkGroup title={f.resources.title} links={f.resources.links} />
          </div>

          <div className="flex-col flex w-full gap-8">
            <LinkGroup title={f.company.title} links={f.company.links} />
            <LinkGroup title={f.downloadApp.title} links={f.downloadApp.links} />
          </div>
        </div>

        <div className="items-center flex-col-reverse flex w-full mt-2 gap-4 sm:mt-0 md:flex-row md:items-start md:justify-between">
          <div className="items-center flex-col flex w-full gap-2 md:items-start">
            <button onClick={openPrivacyModal} className="items-center gap-x-2 cursor-pointer text-center flex w-44 h-6">
              <svg className="flex w-6 h-6" fill="none" height="24" viewBox="0 0 48 24" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_footer)" fill="none">
                  <rect className="w-12 h-6" fill="none" height="22.4" rx="11.2" stroke="#94a3b8" x="0.8" y="0.8" />
                  <path d="M22.0667 23.2L28.6 0.8H36C42.1856 0.8 47.2 5.81441 47.2 12C47.2 18.1856 42.1856 23.2 36 23.2H22.0667Z" fill="rgb(148, 163, 184)" stroke="#94a3b8" />
                  <path d="M7.12019 11.4853L11.3628 15.7279L19.8481 7.24264" fill="none" stroke="#94a3b8" />
                  <path d="M39.228 16.2426L30.7427 7.75732" fill="none" stroke="#ffffff" />
                  <path d="M39.228 7.75739L30.7427 16.2427" fill="none" stroke="#ffffff" />
                </g>
                <defs fill="none">
                  <rect className="w-12 h-6" fill="rgb(148, 163, 184)" height="24" />
                </defs>
              </svg>
              <p className="text-slate-400 text-sm">{f.privacyChoices}</p>
            </button>
            <p className="text-slate-400 text-sm">{f.copyright}</p>
            {f.cnpj && <p className="text-slate-400 text-sm">{f.cnpj}</p>}
          </div>

          <div className="items-center flex-col flex w-full gap-2 text-slate-400 md:items-end">
            <div className="items-center gap-x-6 flex">
              <svg className="cursor-pointer w-4 h-4" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.90689 19.3237C4.90814 19.6962 4.60689 19.9994 4.23439 20C4.23439 20 4.23314 20 4.23252 20H1.35752C0.985019 20.0012 0.681894 19.7 0.681269 19.3275C0.681269 19.3262 0.681269 19.325 0.681269 19.3237V7.2725C0.681269 6.89875 0.984394 6.59625 1.35752 6.59625H4.23189C4.60502 6.5975 4.90627 6.9 4.90627 7.2725V19.3231L4.90689 19.3237ZM2.79439 5.45437C1.28814 5.45437 0.0668945 4.23375 0.0668945 2.7275C0.0668945 1.22125 1.28814 0 2.79439 0C4.30064 0 5.52189 1.22125 5.52189 2.7275C5.52189 4.23375 4.30064 5.455 2.79439 5.455V5.45437ZM19.9325 19.3706C19.9338 19.7131 19.6569 19.9912 19.3144 19.9925C19.3131 19.9925 19.3119 19.9925 19.3106 19.9925H16.22C15.8775 19.9937 15.5994 19.7169 15.5981 19.3744C15.5981 19.3731 15.5981 19.3719 15.5981 19.3706V13.725C15.5981 12.8812 15.8456 10.0306 13.3925 10.0306C11.4925 10.0306 11.105 11.9812 11.0288 12.8581V19.3781C11.0288 19.7181 10.7556 19.995 10.4163 20H7.43064C7.08814 20 6.81064 19.7225 6.81064 19.38C6.81064 19.38 6.81064 19.3787 6.81064 19.3781V7.22C6.80939 6.8775 7.08627 6.59937 7.42877 6.59812C7.42877 6.59812 7.43002 6.59812 7.43064 6.59812H10.4163C10.7594 6.59812 11.0381 6.87625 11.0381 7.22V8.27062C11.7438 7.21062 12.7888 6.39625 15.02 6.39625C19.9619 6.39625 19.9294 11.0106 19.9294 13.5456L19.9331 19.3712L19.9325 19.3706Z" fill="rgb(148, 163, 184)" />
              </svg>
              <svg className="cursor-pointer w-4 h-4" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.2844 10.0081H11.481V20H7.32737V10.0081H5.35254V6.47641H7.32737V4.19196C7.32737 2.55637 8.10478 0 11.5193 0L14.5973 0.0121155V3.44013H12.3634C11.9999 3.44013 11.4823 3.62186 11.4823 4.40197V6.47708H14.6471L14.2844 10.0081Z" fill="rgb(148, 163, 184)" />
              </svg>
              <svg className="cursor-pointer w-4 h-4" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.1807 3.91566C15.6801 3.91566 16.0843 4.31988 16.0843 4.81928C16.0843 5.31868 15.6801 5.72289 15.1807 5.72289C14.6813 5.72289 14.2771 5.31868 14.2771 4.81928C14.2771 4.31988 14.6813 3.91566 15.1807 3.91566ZM14.5181 10C14.5181 12.4916 12.4916 14.5181 10 14.5181C7.50843 14.5181 5.48193 12.4916 5.48193 10C5.48193 7.50843 7.50843 5.48193 10 5.48193C12.4916 5.48193 14.5181 7.50843 14.5181 10ZM12.7108 10C12.7108 8.50301 11.497 7.28916 10 7.28916C8.50301 7.28916 7.28916 8.50301 7.28916 10C7.28916 11.497 8.50301 12.7108 10 12.7108C11.497 12.7108 12.7108 11.497 12.7108 10ZM14.5783 0C17.5675 0 20 2.43253 20 5.42169V14.5783C20 17.5675 17.5675 20 14.5783 20H5.42169C2.43253 20 0 17.5675 0 14.5783V5.42169C0 2.43253 2.43253 0 5.42169 0H14.5783ZM14.5783 1.80723H5.42169C3.42831 1.80723 1.80723 3.42831 1.80723 5.42169V14.5783C1.80723 16.5717 3.42831 18.1928 5.42169 18.1928H14.5783C16.5717 18.1928 18.1928 16.5717 18.1928 14.5783V5.42169C18.1928 3.42831 16.5717 1.80723 14.5783 1.80723Z" fill="rgb(148, 163, 184)" />
              </svg>
              <svg className="cursor-pointer w-4 h-4" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.7213 5.23495C19.6163 4.35943 18.7911 3.51955 17.9273 3.40676C12.662 2.75244 7.33706 2.75244 2.0732 3.40676C1.20891 3.51907 0.383681 4.35894 0.278697 5.23495C-0.0928989 8.44454 -0.0928989 11.5565 0.278697 14.7656C0.383681 15.6411 1.20891 16.4819 2.0732 16.5938C7.33706 17.2481 12.662 17.2481 17.9273 16.5938C18.7906 16.4824 19.6163 15.6416 19.7213 14.7656C20.0929 11.557 20.0929 8.44454 19.7213 5.23495ZM8.33319 12.7377V7.26383C8.33319 7.00894 8.61738 6.85659 8.8293 6.9982L12.9349 9.73511C13.1244 9.86158 13.1244 10.1399 12.9349 10.2664L8.8293 13.0033C8.61738 13.1449 8.33319 12.9926 8.33319 12.7377Z" fill="rgb(148, 163, 184)" />
              </svg>
              <svg className="cursor-pointer w-4 h-4" fill="none" viewBox="0 0 26 25" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_footer_x)" fill="none">
                  <path d="M14.9475 10.587L24.2481 0H22.045L13.9659 9.19067L7.5179 0H0.0791016L9.83181 13.8993L0.0791016 25H2.28227L10.8085 15.2923L17.6195 25H25.0583M3.07744 1.62698H6.46212L22.0433 23.453H18.6578" fill="rgb(148, 163, 184)" />
                </g>
                <defs fill="none">
                  <rect className="w-6 h-6" fill="rgb(255, 255, 255)" height="25" transform="translate(0.0791016)" />
                </defs>
              </svg>
              <a className="items-center gap-x-2 flex" href={`tel:${f.phone.replace(/[^+\d]/g, "")}`}>
                <svg className="cursor-pointer w-4 h-4" fill="rgb(0, 0, 0)" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.64 21.25c-2.54 2.55-8.38.83-13-3.84S.2 6.9 2.75 4.36l2.78-2.79 5.37 5.37-2 2a2.18 2.18 0 0 0 0 3.06l3.1 3.1a2.18 2.18 0 0 0 3.07 0l2-2 5.37 5.37Z" fill="none" stroke="#94a3b8" />
                </svg>
                <span className="cursor-pointer text-sm">{f.phone}</span>
              </a>
            </div>
            <div className="flex-col flex text-sm lg:items-end">
              <p className="cursor-pointer text-right">{f.address}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
