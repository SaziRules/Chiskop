import Section from "@/components/Section";
import Container from "@/components/Container";
import GlobalBanner from "@/components/sections/GlobalBanner";

export default function CompetitionsPage() {
  return (
    <main className="bg-white text-chiskop-black">

      {/* ───────────── HERO ───────────── */}
      <GlobalBanner
        desktopImage="/comp-images/comp-desktop.png"
        mobileImage="/comp-images/comp-mobile.png"
        alt="Chiskop Beat the AI Competition"
      />

      {/* ───────────── CONTENT ───────────── */}
      <Section className="py-16 md:py-24">
        <Container className="max-w-[900px] mx-auto px-6 md:px-8 space-y-12">

          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black uppercase">
              How to Enter
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              To enter this competition, you will need to create a TikTok video showing how YOU creatively use Chiskop
              and introduce the brand in your own style to Beat the AI. In your video, encourage your followers to
              support your entry by engaging with your post and following the Chiskop page.
            </p>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              You must use <strong>#BeatTheChiskopAI</strong> and tag Chiskop in your entry post for your entry to be
              tracked and considered valid.
            </p>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              All entries must remain public for the duration of the Competition and voting period. Private, deleted,
              restricted or inaccessible entries may be disqualified. The Sponsor reserves the right to remove or
              disqualify any entry deemed inappropriate, offensive, misleading, fraudulent or off-brand. All engagement
              relating to entries must be authentic and organic, and any suspected use of fake accounts, purchased
              engagement, bots or unfair manipulation may result in disqualification.
            </p>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Only TikTok entries will be considered valid for the Competition. Engagement, voting and winner selection
              will be based solely on activity received on the original TikTok entry post during the voting period.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black uppercase">
              Competition Period
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              This Competition is valid from <strong>01 June 2026 to 14 June 2026</strong> and voting will take place
              until <strong>30 June 2026</strong>.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black uppercase">
              Eligibility
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              This Competition is open to everyone in South Africa, aged 18 years and older, excluding all
              Sponsor&apos;s employees, their advertising agencies, sales agents, and their immediate families.
              Companies and/or other organisations are not eligible to participate in the Competition.
            </p>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Employees, contractors, directors, and officers of Sponsor and its affiliates, subsidiaries,
              distributors, sales representatives, retailers, and advertising, promotion, and judging agencies and all
              other service agencies and providers involved with the Competition, and members of the immediate family
              (spouse, parent, child, siblings and their respective spouses, regardless of where they reside) and
              households of each, whether or not related, are not eligible to participate or win. Void where prohibited
              by law.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black uppercase">
              Participation
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Alias accounts will not be accepted, and nor will entries on behalf of another person. All entrants need
              to enter via a legitimate social media profile and on behalf of themselves.
            </p>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              The use of automated and/or manual techniques, devices, and mechanisms, including but not limited to
              software, code, or any other systems that circumvent and/or abate the proper conduct and purpose of this
              Competition, whether intentional or otherwise, is prohibited. Reasonable establishment on the use of
              multiple accounts, aliases, or other identification to submit multiple comments suffices to raise the
              ineligibility of participants to win a Prize.
            </p>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Participants may NOT upload any comments, content, images, emoticons, and/or any other media containing
              material that is of a pornographic nature, illegal, defamatory, threatening, obscene, harmful to minors,
              promoting racism, hatred, discrimination of any kind, and/or is against any applicable standards or
              guidelines of Sponsor. Such comments will be disqualified and entrants banned from the Competition.
            </p>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              The Sponsor will not take responsibility for entries lost, damaged, or delayed as a result of any
              network, computer hardware, or software failure of any kind.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black uppercase">
              Prizes
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Two (2) winners will each receive a <strong>3-month influencer collaboration contract</strong> with
              Chiskop, which will include a maximum of 2 posts per month across TikTok and Instagram. Content created
              during the collaboration may be reused and promoted by Chiskop across its marketing platforms, and
              winners may not collaborate with competing male grooming brands during the contract period.
            </p>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Each winner will also receive a <strong>Chiskop product hamper</strong> for content creation purposes.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black uppercase">
              Winner Selection, Notification & Redemption
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              The winner/s will be contacted via TikTok Direct Message (DM). Following two unsuccessful attempts to
              make contact with a selected winner, or if the winner fails to respond within 48 hours, the prize will
              be forfeited and may be awarded to another winner.
            </p>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Upon being contacted, all winners will be required to provide a valid form of identification, physical
              address, and their cell phone number. Failure to provide these details within the specified timeframe
              will result in disqualification.
            </p>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Winners will be selected based on the highest verified overall engagement achieved on their official
              TikTok competition entry during the voting period. Engagement includes likes, comments, and shares
              received on the entry video. The Sponsor reserves the right to verify the authenticity of all engagement
              and may disqualify any participant suspected of using fake accounts, purchased engagement, automated
              activity, or any unfair means to influence the outcome. The Sponsor&apos;s decision on all matters
              relating to the Competition will be final and binding.
            </p>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Selected winners will be required to enter into a separate influencer agreement containing the full
              collaboration terms, content requirements, approval processes, and usage rights. Failure or refusal to
              enter into this agreement may result in forfeiture of the prize.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black uppercase">
              Internet
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Sponsor is not responsible for computer system, phone line, hardware, software, cable, satellite,
              Internet Service Provider (ISP) or programme malfunctions, or other errors, failures, or delays in
              computer transmissions or network connections. Sponsor is not responsible for any errors whether human,
              mechanical, electronic, computer, network, typographical, printing, or otherwise relating to, or in
              connection with, the Competition. Sponsor reserves the right, at its sole discretion, to disqualify any
              individual who tampers with the Competition process.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black uppercase">
              Right to Cancel, Terminate, Modify or Suspend
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Subject to applicable laws, Sponsor may, at its sole discretion, cancel, terminate, modify, suspend, or
              re-run the Competition and withhold the prize(s), including without limitation, if there are insufficient
              eligible participants or for any reason, or any aspect of this Competition is not capable of running as
              planned, including by reason of computer virus, communications network failure, bugs, tampering,
              unauthorised intervention, fraud, technical failure or any other cause beyond the control of Sponsor,
              except as provided for in the Consumer Protection Act No. 68 of 2008.
            </p>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              In the event the Competition is cancelled or terminated, Sponsor reserves the right to conduct a random
              draw from among all eligible participants. Sponsor shall have the right to, at its sole discretion, and
              without notice (i) modify these Official Rules and/or (ii) extend the Submission Period.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black uppercase">
              Copyright
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Participants agree that the Promoter will have the right to use, copy, reproduce, reasonably modify,
              adapt, publish, translate, create collective or derivative works from, distribute, perform and display
              their entry in whole or in part and to incorporate it in other works in any form, media, or technology
              now known or later developed with no compensation to the Participant/s. The origin of the work will be
              appropriately attributed. The Promoter is however, under no obligation to any Participant or Winner to
              utilise any part of his/her Entry/submission.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black uppercase">
              Privacy
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              By entering this Competition each Participant authorises the Sponsor and the organisers of the
              Competition to collect, store, process and use (not share) personal information for purposes of
              performing this Competition, communication and/or statistical purposes. The processing of Personal
              Information will take place in accordance with the provisions of POPIA. The Participant has the right to
              request any corrections or deletions of their Personal Information.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black uppercase">
              Release
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              By participating, and to the extent permitted by applicable laws, you agree to release Sponsor and any
              third-party retained by or on behalf of Sponsor from any and all liability, loss or damage incurred with
              respect to their participation in the Competition and the awarding, receipt, possession, and/or use or
              misuse of any prize. Under no circumstances will you be permitted to obtain awards for, and hereby waive
              all rights to claim, any punitive, incidental, consequential or other damages. By participating in the
              Competition, you agree that your participation is gratuitous and made without restriction and will not
              place Sponsor under any obligation.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black uppercase">
              Governing Law
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              This Competition is governed by, subject to and is to be interpreted, construed and enforced in
              accordance with the federal, provincial, state, territorial and local laws of South Africa.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-chiskop-black uppercase">
              General Terms
            </h2>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              Naturelle Personal Care cc and Sponsor will not be held responsible for any delays in the delivery of
              the prizes, nor errors on the part of the chosen delivery company once the prize has left Naturelle
              Personal Care cc and/or Sponsor&apos;s headquarters.
            </p>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              This Competition is in no way sponsored, endorsed or administered by, or associated with TikTok,
              Instagram or Facebook.
            </p>
            <p className="text-[15px] md:text-[16px] text-chiskop-gray leading-relaxed">
              This offer is exclusive to Chiskop. For further information, please contact the Sponsor&apos;s Consumer
              Care Line via WhatsApp on <strong>+27 60 996 6087</strong> or send us an Inbox on the Chiskop Facebook
              page. We respond to queries from 08:30–17:00 on weekdays.
            </p>
          </div>

          <div className="pt-10 border-t border-[#e5e5e5]">
            <p className="text-[14px] text-chiskop-gray">
              Last updated: <strong>June 2026</strong>
            </p>
          </div>

        </Container>
      </Section>
    </main>
  );
}
