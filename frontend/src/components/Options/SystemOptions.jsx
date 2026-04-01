import Footer from '../Footer/Footer';
import Consultation from "../Consultation/Consultation"
import { Heading2, RichParagraph, Heading3 } from '../Common/Common'

const VanSystemsPage = () => {
    return (
        <>
            {/* Main Wrapper with Theme Secondary Color */}
            <div className="bg-secondary min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

                    {/* Water System Section */}
                    {/* Water System Section */}
                    <section>
                        <div className="text-center mb-16">
                            <div className="inline-block relative">
                                <Heading2 className="my-4" textColor="text-primary" text='Water System' />
                                <div className="mx-auto w-24 h-1 bg-hover rounded-lg"></div>
                            </div>

                            <RichParagraph className="mt-6 max-w-2xl mx-auto">
                                At Big Bear Vans, we install customized plumbing systems in our camper vans. Here’s what we include:
                            </RichParagraph>
                        </div>

                        {/* Water Pump */}
                        <div className="bg-white border border-primary/10 rounded-lg p-8 md:p-12 shadow-sm mb-10">
                            <div className="flex items-center mb-8">
                                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-4">
                                    <div className="w-3 h-3 bg-hover rounded-full"></div>
                                </div>
                                <Heading3 textColor="text-primary" text="Water Pump" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-6 bg-secondary rounded-lg border-l-4 border-hover">
                                    <RichParagraph>
                                        We commonly use 12V electric water pumps in our camper vans.
                                    </RichParagraph>
                                </div>
                                <div className="p-6 bg-secondary rounded-lg border-l-4 border-hover">
                                    <RichParagraph>
                                        Provides pressurized water to faucets, showerheads, and other fixtures.
                                    </RichParagraph>
                                </div>
                            </div>
                        </div>

                        {/* Water Tanks */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-center">
                                <Heading3 textColor="text-primary" text="Water Tanks" />
                            </div>

                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* Fresh Tank */}
                                <div className="bg-primary rounded-lg p-10 shadow-xl text-secondary">
                                    <h4 className="text-2xl font-bold mb-6 !text-hover">Fresh Water Tank:</h4>
                                    <RichParagraph className="mb-8 opacity-90 text-secondary">
                                        Stores clean water for drinking, cooking, and washing. You can choose:
                                    </RichParagraph>

                                    <ul className="space-y-4">
                                        {[
                                            "A 20-gallon freshwater tank.",
                                            "A 30-gallon freshwater tank.",
                                            "A 37-gallon undermount instead of a spare tire."
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center bg-white/10 p-4 rounded-lg">
                                                <div className="w-2 h-2 bg-hover rounded-full mr-4"></div>
                                                <RichParagraph className="text-secondary">{item}</RichParagraph>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Grey Tank */}
                                <div className="bg-white border-2 border-primary rounded-lg p-10 shadow-lg">
                                    <h4 className="text-2xl font-bold mb-6 text-primary">Grey Water Tank:</h4>
                                    <RichParagraph className="text-primary/70 mb-8">
                                        Stores wastewater from sinks and showers. You can choose:
                                    </RichParagraph>

                                    <ul className="space-y-4">
                                        {[
                                            "A 7-gallon portable greywater tank under the sink.",
                                            "A fixed 20-gallon tank under the van.",
                                            "A 37-gallon greywater tank undermount instead of a spare tire (for rear bathroom layouts)."
                                        ].map((item, i) => (
                                            <li key={i} className="bg-secondary p-4 rounded-lg border border-primary/5">
                                                <RichParagraph>{item}</RichParagraph>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Heaters */}
                        <div className="mt-20 bg-white rounded-lg shadow-2xl overflow-hidden border border-primary/5">
                            <div className="p-10 md:p-16">
                                <div className="mb-12">
                                    <Heading3 textColor="text-primary" text="Heaters" />
                                    <div className="w-16 h-1 bg-hover mt-2 rounded-full"></div>

                                    <RichParagraph className="max-w-xl mt-4">
                                        To regulate the temperature of your camper van during winter, we install heating systems. You can choose:
                                    </RichParagraph>
                                </div>

                                <div className="grid gap-6">
                                    {[
                                        "An advanced glycol combined water and air heater connected to your fuel tank, so you don’t have to worry about draining your batteries.",
                                        "A diesel air heater under the passenger seat paired with a 110V water heater.",
                                        "A diesel air heater under the passenger seat paired with a 12V water heater."
                                    ].map((text, index) => (
                                        <div key={index} className="flex items-start bg-secondary p-6 rounded-lg">
                                            <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mr-6 shadow-sm">
                                                <span className="text-primary font-bold">{index + 1}</span>
                                            </div>
                                            <RichParagraph>{text}</RichParagraph>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <Consultation />
            <Footer />
        </>
    );
};

export default VanSystemsPage;