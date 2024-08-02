import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import HomeBookCards from '../../components/BookCards/HomeBookCards'
import { GlobalStateContext } from '../../Context/GlobalState'

const PrivacyPolicy = () => {

   

    const { results, setResults,isSearch,setIsSearch} = useContext(GlobalStateContext)
    const location = useLocation()
    //reset search on route change
    useEffect(()=>{
      setIsSearch(false)
      setResults([])
    },[location,setIsSearch,setResults])



    return (
        <div className='privacy-container'>
            <Navbar />

            {isSearch?(<section className="dark:bg-gray-900 features" data-aos="fade-up">
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="max-w-screen-md mb-8 lg:mb-16 features-text">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Search Results</h2>
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
            (<div className="privacy-policy">
                <h2>Privacy Policy</h2>
                <p>
                    At Iwemi.Com, We Value All Of Our Customers And Understand That You Care About The Privacy And Security Of Your Personal Information. The Privacy Principles Set Out Below Apply To Iwemi.Com's Collection, Storage, Use And Disclosure Of Personal Information That May Be Collected By Us When You Interact With Iwemi.Com, Such As When You Visit Our Stores Or Websites, Or Use Our Devices Or Applications, Participate In Our Member Program, Or Deal With Customer Service.
                </p>
                <p>
                    Protecting The Privacy And Security Of Your Personal Information Is A Priority At Iwemi.Com, And We Do Our Best To Ensure That Your Personal Information Is Always Handled In A Safe And Responsible Manner In Accordance With The Following Privacy Principles.
                </p>

                <h3>Clarity</h3>
                <p>Iwemi.Com Strives To Communicate Clearly About Your Privacy And How We Handle Your Personal Information.</p>

                <h3>Security</h3>
                <p>Iwemi.Com Follows Security Standards, Processes And Procedures That Are Designed To Protect Your Personal Information.</p>

                <h3>Integrity</h3>
                <p>Iwemi.Com Does Not Sell Or Rent Your Personal Information And Respects Your Preferences With Respect To Your Personal Information, In Accordance With These Privacy Principles, As Well As Our Privacy Policy.</p>

                <h3>Data Types And Overview</h3>
                <p>
                    Personal Data Means Data That Allows Someone To Identify Or Contact You, (For Example, Your Name, Address, Telephone Number, And E-Mail Address) As Well As Any Other Non-Public Information About You That Can Be Associated With Or Linked To Any Data That Allows The Identification Of Individuals. Anonymous Data Means Data That Is Not Associated With Or Linked To Your Personal Data. Anonymous Data Does Not, By Itself, Permit The Identification Of Individual People. We Collect Personal Data And Anonymous Data, As Described Below.
                </p>
                <p>
                    We Collect And Use Both Personal Data And Anonymous Data About Users To (I) Provide, Measure, And Improve The Services, (Ii) Communicate With You About Your Account (As Defined Below) Or Transactions, (Iii) Send You Information About Changes To The Services Or Our Policies, (Iv) Send You Offers And Promotions, (V) Personalize Content For You On The Services, (Vi) Detect, Investigate And Prevent Activities That May Violate Our Policies Or Applicable Law, And (Vii) As Otherwise Described In This Policy.
                </p>

                <h3>How We Obtain Information</h3>

                <h4>Information You Provide To Us</h4>
                <p>
                    You Do Not Have To Provide Personal Data To Use The Site. However, You May Need To Provide Certain Personal Information Use Select Services, Such As When You Create A User Account (An “Account”). When You Create Or Update An Account, You Must Provide Personal Data That Lets Us Contact You And Deliver Items Purchased Through The Paid Professional Services, And When You Place An Order We Collect Financial Details Such As Your Bank Account Number And/Or Credit Card Number That Allow Us Or Our Third Party Service Providers To Process Payments (“Financial Information”) All Of Which We May Store And Use As Set Forth In This Policy. In Addition, We May Collect The Following Information In Connection With The Services And Site:
                </p>
                <ul>
                    <li>
                        If You Tell Us Where You Are (E.G., By Allowing Your Mobile Device To Send Us Your Location), We May Store And Use That Information To Provide You With Location-Based Information. This Feature May Be Deactivated In The Location Settings Of Your Device.
                    </li>
                    <li>
                        After You Establish An Account, Our Site Lets You Store Preferences Like How Your Content Is Displayed, Your Location, And Safe Search Settings. As More Fully Described In Our Terms Of Use, We May Associate These Choices With Your ID, Browser Or Mobile Device.
                    </li>
                    <li>
                        We Retain Information On Your Behalf, Such As Content Submitted Via The Services In Connection With An Order, The Creation Of Content, Or The Distribution Of Content.
                    </li>
                    <li>
                        If You Provide Us Feedback Or Contact Us Via E-Mail, We Will Collect Your Name And E-Mail Address, As Well As Any Other Content Included In The E-Mail, In Order To Reply.
                    </li>
                    <li>
                        If We Provide The Ability To Post Messages To The Site (I.E., A Forum), The Information In Your Posting Will Be Stored On Our Servers And Other Users Will Be Able To See It.
                    </li>
                    <li>
                        We Also Collect Other Types Of Personal Data That You May Provide To Us Voluntarily In Connection With Support For The Services, Such As Your Operating System And Version And Mobile Device Or Computer Type.
                    </li>
                    <li>
                        If You Participate In A Survey, Contest Or Giveaway On Our Site, We May Ask For Your E-Mail Address And/Or Phone Number (To Notify You If You Win Or Not). We May Also Ask For First And Last Names, And Sometimes Post Office Addresses To Verify Your Identity Or To Send Prizes. Surveys And Contests Are Voluntary And You Should Read The Rules For Each Contest That You Enter.
                    </li>
                    <li>We May Also Collect Personal Data At Other Points During Your Use Of Our Site Or Services That State That Personal Data Is Being Collected.</li>
                </ul>

                <h4>Information Collected Via Technology</h4>
                <p>
                    We Use Standard Online And Mobile Technologies To Perform And Improve The Services, And In Some Cases, These Technologies Provide Additional Information About You:
                </p>
                <ul>
                    <li>
                        Information Collected By Our Servers. To Make Our Site And Services More Useful To You, Our Servers (Which May Be Hosted By A Third-Party Service Provider) Collect Information From You, Including Your Browser Type, Operating System, Internet Protocol (“IP”) Address (A Number That Is Automatically Assigned To Your Computer When You Use The Internet, Which May Vary From Session To Session), Domain Name, And/Or A Date/Time Stamp For Your Visit.
                    </li>
                    <li>
                        Log Files. As Is True Of Most Websites, We Gather Certain Information Automatically And Store It In Log Files. This Information Includes IP Addresses, Browser Type, Internet Service Provider (“ISP”), Referring/Exit Pages, Operating System, Date/Time Stamp, And Clickstream Data. We Use This Information To Analyze Trends, Administer The Services, Track Users’ Movements Around The Site, Gather Demographic Information About Our User Base As A Whole, And Better Tailor Our Services To Our Users’ Needs. For Example, Some Of The Information May Be Collected So That When You Visit The Site Or The Services Again, It Will Recognize You And The Information Could Then Be Used To Serve Information More Appropriate To Your Interests. Except As Noted In This Policy, We Do Not Link This Automatically-Collected Data To Personal Data.
                    </li>
                    <li>
                        “Cookies” Are Small Pieces Of Information That A Website Sends To Your Computer’s Hard Drive While You Are Viewing The Website. We May Use Both Session Cookies (Which Expire Once You Close Your Web Browser) And Persistent Cookies (Which Stay On Your Computer Until You Delete Them) To Provide You With A More Personal And Interactive Experience Of The Services.
                    </li>
                    <li>
                        Pixel Tags. In Addition, We Use “Pixel Tags” (Also Referred To As Clear Gifs, Web Beacons, Or Web Bugs). Pixel Tags Are Tiny Graphic Images With A Unique Identifier, Similar In Function To Cookies That Track Online Movements Of Web Users. In Contrast To Cookies, Pixel Tags Are Embedded Invisibly In Web Pages And Not Stored On A User’s Computer. Pixel Tags Also Let Us To Send E-Mail Messages In A Format Users Can Read, And Tell Us Whether E-Mails Have Been Opened To Ensure That We Are Sending Only Messages That Are Of Interest To Our Users. We Do Not Tie The Information Gathered By Pixel Tags To Our Users’ Personal Data.
                    </li>
                    <li>
                        Flash LSOs. When We Post Videos, Third Parties May Use Local Shared Objects, Known As “Flash Cookies,” To Store Your Preferences For Volume Control Or To Personalize Certain Video Features. Flash Cookies Are Different From Browser Cookies Because Of The Amount And Type Of Data And How The Data Is Stored. Cookie Management Tools Provided By Your Browser Will Not Remove Flash Cookies.
                    </li>
                    <li>
                        How We Respond To Do Not Track Signals. Users May Use The Iwemi.Com “Do Not Track” Feature, Which Sends A Header Signal To Websites Requesting That The Site Not Track The User’s Activity. Iwemi.Com’s Website Does Not Respond To Do Not Track Signals; However, Iwemi.Com Website Users Who Use The Do Not Track Feature Will Not Have Their Site Activities Tracked By Iwemi.Com.
                    </li>
                </ul>

                <h3>Security</h3>
                <p>
                    Iwemi.Com Takes What It Believes To Be Reasonable Physical, Administrative, And Technical Measures To Help Prevent Unauthorized Access To, Use Of, And Disclosure Of Your Personal Data. We Also Require Our Third Party Service Providers To Use Personal Data Only On Behalf Of Iwemi.Com And For The Purposes For Which It Was Provided Or To Comply With Legal Requirements. In The Event Of A Breach Of Your Personal Data, We May Notify You Electronically, By Posting A Notification On The Site, Or By Sending An E-Mail To You.
                </p>

                <h3>Updating Your Information</h3>
                <p>
                    If You Want To Update Or Correct Your Personal Data, Please Update Your Account Information Through Your Account Portal Or Contact Us At Contact@Iwemi.Com. We Will Respond To Your Request Within A Reasonable Time. If You Would Like To Delete Your Account, Please E-Mail Us At Contact@Iwemi.Com, But Note That We May Retain Certain Information As Required By Law Or For Legitimate Business Purposes.
                </p>

                <h3>Third-Party Websites</h3>
                <p>
                    Our Services May Contain Links To Third-Party Websites. When You Click On A Link To Any Other Website Or Location, You Will Leave Our Site And Go To Another Site, And Another Entity May Collect Personal Data Or Anonymous Data From You. We Have No Control Over, Do Not Review, And Cannot Be Responsible For These Outside Websites Or Their Content. Please Be Aware That The Terms Of This Privacy Policy Do Not Apply To These Outside Websites Or Content, Or To Any Collection Of Your Personal Data After You Click On Links To Such Outside Websites. We Encourage You To Read The Privacy Policies Of Every Website You Visit. The Links To Third-Party Websites Or Locations Are For Your Convenience And Do Not Signify Our Endorsement Of Such Third Parties Or Their Products, Content, Or Websites.
                </p>

                <h3>Changes To This Privacy Policy</h3>
                <p>
                    This Privacy Policy Is Subject To Occasional Revision, And If We Make Any Substantial Changes In The Way We Use Your Personal Data, We Will Post A Notification On The Site And/Or Send You An E-Mail To Inform You Of The Updated Policy. If You Object To Any Changes, You May Close Your Account. Continued Use Of Our Site Following Notice Of Any Such Changes Shall Indicate Your Acknowledgement Of Such Changes And Agreement To Be Bound By The Terms And Conditions Of Such Changes.
                </p>

                <h3>Contacting Us</h3>
                <p>
                    If You Have Any Questions About This Privacy Policy, Please Contact Us At Contact@Iwemi.Com.
                </p>
            </div>)
}
            <Footer />
        </div>
    )
}

export default PrivacyPolicy