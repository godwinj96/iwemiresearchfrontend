import { useContext, useEffect } from 'react'
import Navbar from '../../components/NavBar/NavBar'
import { useLocation} from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import { GlobalStateContext } from '../../Context/GlobalState'
import HomeBookCards from '../../components/BookCards/HomeBookCards'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Terms = () => {

    const { results, setResults,isSearch,setIsSearch,searchInput } = useContext(GlobalStateContext)
    const location = useLocation()
    //reset search on route change
    useEffect(()=>{
      setIsSearch(false)
      setResults([])
    },[location,setIsSearch,setResults])
    useEffect(() => {
      // Initialize AOS
      AOS.init({
        duration: 1000,
        once: true,
        delay: 100 // Add a small delay
      });
    }, []);

    return (
        <div className='terms'>
            
            {isSearch?(<section className="dark:bg-gray-900 features" data-aos="fade-up">
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="max-w-screen-md mb-8 lg:mb-16 features-text">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Search Results for "{searchInput}"</h2>
            </div>
            <div className="space-y-8 md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-12 md:space-y-0">
              {results.length > 0 ? (
                results.map(book => (
                  <HomeBookCards key={book.id} book={book} />
                ))
              ) : (
                <p className="text-gray-500 sm:text-xl dark:text-gray-400">No results found</p>
              )}
            </div>
          </div>
        </section>)
            :
            (<div className="terms-container">
                <h1 className="terms-title">Terms & Conditions</h1>
                <p>Welcome To Iwemi.Com, A Website Owned And Operated By Retail Development And Investment Company Limited</p>
                <p>The Following Is An Agreement Between You And RDIC (&quot;Iwemi.Com&quot;) Which Governs The Use Of This Web Site And Any Web Page Which Is A Part Of This Web Site And Your Purchase Of Any Product Or Service Through The Use Of This Web Site.</p>

                <h2>1. ACCEPTANCE OF THE TERMS AND CONDITIONS OF THIS AGREEMENT.</h2>
                <p>Your Use Of This Web Site, Including Visiting Any Page Which Is A Part Of This Web Site, And Your Purchase Of Any Product Or Service Through The Use Of This Web Site Constitute Your Acceptance Of The Terms And Conditions Of This Agreement. You Understand And Acknowledge That Your Use Of This Web Site And Your Purchase Of Any Product Or Service Through The Use Of This Web Site Are Conditioned On Your Prior Acceptance Of The Terms Of This Agreement. You Agree To Use This Web Site Solely In Accordance And Compliance With The Terms Of This Agreement.</p>
                <p>IF YOU DO NOT AGREE TO THE TERMS AND CONDITIONS OF THIS AGREEMENT, DO NOT USE THIS WEB SITE OR VISIT ANY PAGE WHICH IS A PART OF THIS WEB SITE OR PURCHASE ANY PRODUCT OR SERVICE THROUGH THE USE OF THIS WEB SITE. THIS AGREEMENT CONTAINS DISCLAIMERS AND LIMITATIONS OF WARRANTIES AND LIABILITIES AND PROVISIONS REGARDING WHERE A LAWSUIT MAY BE BROUGHT.</p>

                <h2>2. MODIFICATIONS OF THIS AGREEMENT.</h2>
                <p>Iwemi.Com Reserves The Right, In Its Sole Discretion, To Modify And Amend This Agreement In Any Manner At Any Time By Posting A Change Notice Or New Agreement On Iwemi.Com. Your Continued Use Of This Web Site And The Purchase Of Any Product Or Service Through The Use Of This Web Site Constitute Your Prior Acceptance Of The Terms Of Such Change Notice Or New Agreement.</p>

                <h2>3. ADDITIONAL TERMS.</h2>
                <p>Certain Features, Functions, And Sections Of This Web Site And The Purchase Of Products And Services Through The Use Of This Web Site May Be Subject To Additional Posted Terms And Conditions Governing The Use Of Such Features, Functions And Sections And The Purchase Of Such Products And Services. Such Additional Posted Terms And Conditions Are Expressly Incorporated Into And Made A Part Of This Agreement. In Addition, Iwemi.Com May Establish Guidelines, Policies, And Codes Of Conduct Governing The Use Of This Web Site And All Such Posted Guidelines, Policies, And Codes Of Conduct Are Expressly Incorporated Into And Made A Part Of This Agreement.</p>
                <p>Our Privacy Policy</p>
                <p>Our Shipping Options</p>
                <p>Our Returns Policy</p>

                <h2>4. PROPER USAGE.</h2>
                <p>You Agree To Use This Web Site, And To Purchase Products And Services Through The Use Of This Web Site, Only For Your Own Personal, Non-Commercial Use Unless You Are In An Express Business Relationship With Iwemi.Com. You Agree Not To Use This Web Site (A) In Any Unlawful Manner Or In Any Manner That Creates Civil Or Criminal Liability On The Part Of Iwemi.Com Or Is Otherwise Harmful To Iwemi.Com; (B) In Any Manner That Could Damage, Disable, Overburden, Impair, Impede, Disrupt, Or Alter This Web Site; And (C) In Any Manner That Would Interfere, Impair, Impede, Or Disrupt The Use Of This Web Site By Any Third Party.</p>
                <p>You Agree Not To Post On Or Transmit Through This Web Site Any Material That Is Unlawful; Libellous; Constitutes An Invasion Of Privacy; Harmful; Threatening; Abusive; Harassing; Defamatory; Vulgar; Obscene; Sexually Explicit; Profane; Hateful; Racially, Ethnically, Or Otherwise Objectionable In Any Manner; Constitutes A Breach Of Your Contractual And/Or Fiduciary Obligations; Infringes On Any Third Party Patent, Trademark, Trade Name, Corporate Name, Trade Secret, Copyright Or Other Proprietary Or Property Rights; Or, Contains Viruses, Trojan Horses, Worms Or Other Code, Scripts, Routines, Files Or Programs Designed To Alter, Interrupt, Impede, Limit Or Destroy The Performance And/Or Functioning Of Any Software, Hardware, Or Other Equipment.</p>
                <p>Iwemi.Com Reserves The Right In Its Sole Discretion To Prohibit Any Conduct, Communications, Content, Or Use Of This Web Site, And To Remove Any Content Or Communications, Which In Its Sole Discretion It Finds Objectionable Or Unacceptable In Any Manner.</p>

                <h2>5. INTELLECTUAL PROPERTY RIGHTS.</h2>
                <p>A. Iwemi.Com, The Iwemi.Com Logo, Iwemi Distributors, Iwemi Distributors Logo Are Trademarks Or Registered Trademarks Owned By Iwemi.Com Or Its Affiliated Companies. Other Trademarks, Registered Trademarks, Trade Names, Product Names, Corporate Names, Graphics And Logos Used On This Web Site Are Owned By Their Respective Owners. All Rights In And To Such Trademarks, Registered Trademarks, Trade Names, Product Names, Corporate Names, Graphics And Logos Are Reserved To Their Respective Owners. No License Or Permission Is Given To You To Use Such Trademarks, Registered Trademarks, Trade Names, Product Names, Corporate Names, Graphics Or Logos In Any Manner.</p>
                <p>B. The Copyright In This Web Site, The Content Of This Web Site, And Software Utilized In This Web Site Are Owned By Iwemi.Com. And Its Suppliers And Licensors. All Rights In And To Such Copyrights Are Reserved To Their Respective Owners. No License Or Permission Is Given To You To Use Such Copyrighted Material In Any Manner.</p>
                <p>C. You May Not Remove, Modify, Or Alter In Any Manner Any Notice Regarding Copyright, Trademark, Proprietary Rights, Warranty Information, Disclaimers, Or Warnings Which Are Included In Or On This Web Site Or Any Service Or Product Offered For Use Or Sale Through This Web Site.</p>
                <p>D. THE USE OF THIS WEB SITE, THE CONTENT OF THIS WEB SITE, THE SOFTWARE UTILIZED BY THIS WEB SITE, AND ANY SERVICE OR PRODUCT OFFERED FOR SALE THROUGH THIS WEB SITE, EXCEPT AS EXPRESSLY PERMITTED, IS STRICTLY PROHIBITED AND SHALL CONSTITUTE AN INFRINGEMENT ON THE INTELLECTUAL PROPERTY RIGHTS AND OTHER RIGHTS OF IWEMI.COM AND ITS LICENSORS OR SUPPLIERS AND MAY SUBJECT YOU TO CIVIL AND CRIMINAL PENALTIES, INCLUDING POSSIBLE MONETARY DAMAGES, FOR COPYRIGHT INFRINGEMENT.</p>

                <h2>6. CONTENT SUBMITTED BY YOU.</h2>
                <p>You Agree That All Content Submitted By You For Inclusion, Use Or Distribution On This Web Site Shall Be In Accordance With And In Compliance With The Proper Usage Requirements Contained In Section 4 Of This Agreement.</p>
                <p>By Submitting Content To Iwemi.Com For Inclusion, Use Or Distribution On This Web Site, You Warrant, Represent, And Agree That (A) You Have The Authority To Grant The Rights To Such Content Which Are Being Granted Hereunder; (B) You Own And/Or Control All Rights In And To Such Content; And (C) Such Content Is In Compliance With The Proper Use Requirements Contained In Section 4 Of This Agreement.</p>
                <p>You Will Be Solely Responsible And Liable For Any Claims, Costs, And Damages Arising From Any Infringement Of Copyright, Trademark, Patent Or Other Proprietary Rights And Any Other Claims, Costs, And Damages Arising From Iwemi.Com&apos;s Inclusion, Use Or Distribution Of All Content Submitted By You. Iwemi.Com Neither Assumes, Has, Or Will Have Any Responsibility Or Liability For Any Claims, Costs, And Damages Arising From Any Infringement Of Copyright, Trademark, Patent Or Other Proprietary Rights Or Any Other Claims, Costs, And Damages Arising From Iwemi.Com&apos;s Inclusion, Use Or Distribution Of All Content Submitted By You.</p>
                <p>You Hereby Grant To Iwemi.Com, And Its Affiliated, Subsidiary And Related Companies, A Royalty-Free, Perpetual, Irrevocable, Unlimited, Worldwide Right And License To Use, Reproduce, Publish, Translate, Sublicense, Copy, And Distribute All Such Content Submitted By You, In Whole Or In Part, And/Or To Incorporate Such Content In Other Works In Any Form, Media, Or Technology Now Known Or Hereafter Developed For The Full Term Of Any Copyright That May Exist In Such Content.</p>

                <h2>7. CLAIMS OF INTELLECTUAL PROPERTY INFRINGEMENT.</h2>
                <p>Iwemi.Com Recognizes And Respects The Importance Of Intellectual Property Rights And Endeavours To Respect The Legal Rights Of Others. Upon Receipt Of A Properly Filed Notice Of Intellectual Property Infringement, Iwemi.Com Will Act Expeditiously To Review And Address The Problem. All Notices Of Intellectual Property Infringement Should Be Sent To Iwemi.Com By Email At Info@Iwemi.Com Or By Mail At: Retail Development And Investment Company Limited. All Notices Of Intellectual Property Infringement Should Include The Following Information:</p>
                <ol>
                    <li>An Electronic Or Physical Signature Of The Person Authorized To Act On Behalf Of The Owner Of The Intellectual Property Interest.</li>
                    <li>A Description Of The Intellectual Property Right That Is Alleged To Have Been Infringed.</li>
                    <li>A Description Of Where The Material That Is Alleged To Be Infringing Is Located On This Web Site.</li>
                    <li>Your Address, Telephone Number, And Email Address.</li>
                    <li>A Statement By You That You Have A Good Faith Belief That The Disputed Use Is Not Authorized By The Intellectual Property Owner, Its Agent, Or The Law.</li>
                    <li>A Statement By You, Made Under Penalty Of Perjury, That The Above Information In Your Notice Is Accurate And That You Are The Intellectual Property Owner Or Authorized To Act On The Intellectual Property Owner&apos;s Behalf.</li>
                </ol>

                <h2>8. DISCLAIMER OF WARRANTIES AND LIMITATION OF LIABILITY.</h2>
                <p>YOU EXPRESSLY AGREE THAT YOUR USE OF THIS WEB SITE AND THE PURCHASE OF ANY PRODUCT OR SERVICE THROUGH THE USE OF THIS WEB SITE IS AT YOUR SOLE RISK. IWEMI.COM DOES NOT WARRANT OR GUARANTEE THAT THIS WEB SITE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, NOR DOES IWEMI.COM MAKE ANY WARRANTY OR GUARANTEE AS TO THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THIS WEB SITE OR AS TO THE ACCURACY OR RELIABILITY OF ANY INFORMATION OBTAINED THROUGH THIS WEB SITE. YOU UNDERSTAND AND AGREE THAT ANY MATERIAL AND/OR DATA DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THIS WEB SITE IS DONE AT YOUR OWN DISCRETION AND RISK AND THAT YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF SUCH MATERIAL AND/OR DATA. IWEMI.COM IS NOT RESPONSIBLE FOR ANY CONTENT OR MATERIAL POSTED BY ANY THIRD PARTY ON THIS WEB SITE.</p>
                <p>IWEMI.COM IS PROVIDING THIS WEB SITE AND THE CONTENT OF THIS WEB SITE ON AN &quot;AS IS&quot; BASIS AND MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, WITH RESPECT TO THIS WEB SITE OR ITS CONTENT, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. IN NO EVENT SHALL IWEMI.COM BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DAMAGES OF ANY KIND ARISING OUT OF OR RELATING TO THE USE OF THIS WEB SITE, INCLUDING, WITHOUT LIMITATION, ANY SPECIAL, INCIDENTAL, INDIRECT, OR CONSEQUENTIAL DAMAGES, INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, LOSS OF DATA, OR LOSS OF USE, EVEN IF IWEMI.COM HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>

                <h2>9. INDEMNIFICATION.</h2>
                <p>You Agree To Indemnify, Defend, And Hold Harmless Iwemi.Com And Its Directors, Officers, Employees, Agents, Subsidiaries, Affiliates, And Licensors From And Against Any And All Claims, Costs, And Expenses, Including Reasonable Attorneys&apos; Fees, Arising Out Of Or Relating To Your Use Of This Web Site Or The Purchase Of Any Product Or Service Through The Use Of This Web Site.</p>

                <h2>10. MISCELLANEOUS.</h2>
                <p>A. This Agreement Constitutes The Entire Agreement Between You And Iwemi.Com Governing Your Use Of This Web Site And The Purchase Of Any Product Or Service Through The Use Of This Web Site.</p>
                <p>B. If Any Provision Of This Agreement Is Found To Be Invalid Or Unenforceable By A Court Of Competent Jurisdiction, Such Provision Shall Be Severed From The Remainder Of This Agreement, Which Will Remain In Full Force And Effect.</p>
                <p>C. This Agreement Shall Be Governed By And Construed In Accordance With The Laws Of The State Of California, Without Regard To Its Conflict Of Law Provisions.</p>
                <p>D. Any Dispute Arising Out Of Or Relating To This Agreement, Your Use Of This Web Site, Or The Purchase Of Any Product Or Service Through The Use Of This Web Site Shall Be Brought Exclusively In The State Or Federal Courts Located In Los Angeles County, California, And You Consent To The Jurisdiction Of Such Courts For Such Purposes.</p>
                <p>E. Iwemi.Com&apos;s Failure To Enforce Any Right Or Provision Of This Agreement Shall Not Be Deemed A Waiver Of Such Right Or Provision.</p>
                <p>F. You Agree That Regardless Of Any Statute Or Law To The Contrary, Any Claim Or Cause Of Action Arising Out Of Or Relating To The Use Of This Web Site Or This Agreement Must Be Filed Within One (1) Year After Such Claim Or Cause Of Action Arose Or Be Forever Barred.</p>

                <h2>11. CONTACT INFORMATION.</h2>
                <p>If You Have Any Questions Or Concerns About This Agreement Or This Web Site, Please Contact Iwemi.Com At Info@Iwemi.Com Or By Mail At Retail Development And Investment Company Limited, 1234 Main Street, Los Angeles, CA 90001.</p>

                <p>By Using This Web Site, You Acknowledge That You Have Read And Understand This Agreement And Agree To Be Bound By Its Terms And Conditions.</p>
            </div>)}
            
            
        </div>
    )
}

export default Terms