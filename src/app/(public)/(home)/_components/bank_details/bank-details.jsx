import {
  BsWhatsapp as WhatsappIcon,
  BsEnvelope as EmailIcon,
} from "react-icons/bs";
import CopyToClipboard from "@/components/ui/copy-to-clipboard";

import { getBasicDetails } from "@/server/get-basic-details";
import { Image } from "@/components/image";
import SupportedPaymentLogos from "@/assets/images/supported-payments.png";

export async function BankDetails() {
  const basicDetails = await getBasicDetails();
  const bankDetails = basicDetails.bankDetails;
  return (
    <div className="bg-background-dark">
      <div className="w-full py-12 md:py-16 px-4 max-w-7xl mx-auto space-y-1">
        <div className="bg-white px-4 py-8 sm:px-6 rounded-2xl space-y-6 lg:space-y-0 shadow-md flex flex-wrap lg:flex-nowrap justify-between gap-4">
          <div className="space-y-2 max-w-max">
            <h4 className="text-primary text-xl md:text-2xl font-bold">Bank Account Details</h4>

            <h5 className="text-primary flex items-center  justify-center gap-2 max-w-max py-2">
              <span> For Bank Transfer </span>
              <CopyToClipboard
                text={
                  "Account Name: " +
                  bankDetails.account_Name +
                  "\n" +
                  "Account Number: " +
                  bankDetails.account_number +
                  "\n" +
                  "Bank Name: " +
                  bankDetails.bank_Name +
                  "\n" +
                  "IFSC Code: " +
                  bankDetails.ifsc_code +
                  "\n"
                }
              />
            </h5>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm  sm:text-base">
              <div>
                <span className="text-zinc-500">Account Name:</span>&nbsp;
                <span className="text-zinc-600 font-bold inline-flex items-center gap-2">
                  <span> {bankDetails.account_Name}</span>
                  <CopyToClipboard text={bankDetails.account_Name} />
                </span>
              </div>

              <div>
                <span className="text-zinc-500">Account Number:</span>&nbsp;
                <span className="text-zinc-600 font-bold inline-flex items-center gap-2">
                  <span>{bankDetails.account_number}</span>
                  <CopyToClipboard text={bankDetails.account_number} />
                </span>
              </div>

              <div>
                <span className="text-zinc-500">Bank Name:</span>&nbsp;
                <span className="text-zinc-600 font-bold inline-flex items-center gap-2">
                  <span>{bankDetails.bank_Name}</span>
                  <CopyToClipboard text={bankDetails.bank_Name} />
                </span>
              </div>

              <div>
                <span className="text-zinc-500">IFSC Code:</span>&nbsp;
                <span className="text-zinc-600 font-bold inline-flex items-center gap-2">
                  <span>{bankDetails.ifsc_code}</span>
                  <CopyToClipboard text={bankDetails.ifsc_code} />
                </span>
              </div>
            </div>
          </div>

          <div className="flex-grow lg:w-full">
            <div className="max-w-56 mx-auto flex items-center justify-center overflow-hidden bg-primary rounded-xl p-1 aspect-1">
              <div className="rounded-lg overflow-hidden bg-white p-1 relative w-full h-full">
                <Image fill src={bankDetails.qr_code} />
              </div>
            </div>

            <div className="flex items-center gap-2 justify-center mt-1">
              <p className="font-bold text-sm text-center">
                UPI ID: {bankDetails.upi_id}
              </p>
              <CopyToClipboard text={bankDetails.upi_id} />
            </div>
          </div>

          <div className="sm:min-w-max">
            <h5 className="text-primary">Support</h5>

            <div className="space-y-2 mt-2 text-sm sm:text-base">
              <div className="">For more information please contact:</div>

              <a
                target="_blank"
                rel="noopener"
                href={"https://wa.me/" + basicDetails.whatsapp_number}
                className="flex items-center gap-1 hover:underline font-medium"
              >
                <div className="p-1.5 rounded-xl bg-primary inline-flex items-center justify-center text-white">
                  <WhatsappIcon />
                </div>
                {basicDetails.phone_number}
              </a>
              <a
                target="_blank"
                rel="noopener"
                href={"mailto:" + basicDetails.contact_email}
                className="flex items-center gap-1 hover:underline font-medium"
              >
                <div className="p-1.5 rounded-xl bg-primary inline-flex items-center justify-center text-white">
                  <EmailIcon />
                </div>
                {basicDetails.contact_email}
              </a>
            </div>

            <div className="w-full relative mt-6">
              <Image src={SupportedPaymentLogos} className="w-full h-auto" loadingAnimation={false} />
            </div>
          </div>
        </div>

        <p className="font-semibold text-white text-sm">
          *80G available as per Income Tax Act 1961 and rules made there
          under.Tax Exemption Certificate Ref. No.:&nbsp;
          {bankDetails.tax_exemption_number}
        </p>
      </div>
    </div>
  );
}
