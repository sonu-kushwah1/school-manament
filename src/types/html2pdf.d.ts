declare module "html2pdf.js" {
  const html2pdf: {
    (): {
      from: (element: HTMLElement | null) => {
        save: (filename?: string) => void;
        toPdf: () => { get: () => any };
        set: (options: any) => any;
      };
    };
  };
  export default html2pdf;
}
