import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Toaster, toast } from "sonner";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useCampaignStats, useMakeDonation } from "@/hooks/useQueries";
import { 
  Heart, 
  Users, 
  Target, 
  Copy, 
  Check, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  QrCode,
  TrendingUp,
  Loader2
} from "lucide-react";

const SCROLL_DURATION_MS = 800;
const MEAL_COST_RUPEES = 50;

export default function App() {
  const { data: stats, isLoading } = useCampaignStats();
  const { mutate: recordDonation, isPending: isRecordingDonation } = useMakeDonation();
  
  const [copiedUPI, setCopiedUPI] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const totalAmount = stats ? Number(stats.totalAmount) : 0;
  const mealsSponsored = stats ? Number(stats.mealsSponsored) : 0;
  const targetMeals = stats ? Number(stats.targetMeals) : 1000;
  const percentageComplete = stats?.percentageComplete ?? 0;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToDonation = () => {
    const donationSection = document.getElementById("donation-section");
    if (donationSection) {
      donationSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText("8617335449@pytes");
      setCopiedUPI(true);
      toast.success("UPI ID copied to clipboard");
      setTimeout(() => setCopiedUPI(false), 2000);
    } catch (err) {
      toast.error("Failed to copy UPI ID");
    }
  };

  const handleManualDonationRecord = (amount: number) => {
    recordDonation(BigInt(amount), {
      onSuccess: () => {
        toast.success(`Thank you! Your donation of ₹${amount} has been recorded.`, {
          description: `This will feed ${Math.floor(amount / MEAL_COST_RUPEES)} person(s).`,
          duration: 5000,
        });
      },
      onError: () => {
        toast.error("Failed to record donation. Please try again.");
      },
    });
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-secondary">
        <div 
          className="h-full bg-primary transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url(/assets/generated/hero-pattern.dim_1920x1080.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay for readability on black background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black/90" />
        
        {/* Animated geometric pattern overlay - reduced opacity */}
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l10 10-10 10-10-10L30 0zm0 40l10 10-10 10-10-10 10-10zM0 30l10 10-10 10L0 40l10-10L0 20v10zm40 0l10 10-10 10-10-10 10-10zm10-10l10 10-10 10V30l10-10zM20 30l10-10 10 10-10 10-10-10z' fill='%2300a86b' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            animation: "shimmer 20s linear infinite",
          }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              SVU Students Feeding{" "}
              <span className="text-primary inline-block">1000 People</span>
              <br />
              This Ramadan
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto font-sans leading-relaxed">
              An initiative by students of Swami Vivekananda University to serve Iftar meals to the needy.
            </p>
            
            <Button 
              onClick={scrollToDonation}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 rounded-full shadow-glow hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Heart className="mr-2 h-5 w-5" />
              Support as an SVU Student
            </Button>
          </div>

          {/* Quick stats preview */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-soft">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-1">Total Raised</p>
              <p className="text-3xl font-bold text-foreground">
                {isLoading ? (
                  <span className="animate-pulse">—</span>
                ) : (
                  <AnimatedCounter value={totalAmount} prefix="₹" decimals={0} />
                )}
              </p>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-soft">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-1">Meals Sponsored</p>
              <p className="text-3xl font-bold text-foreground">
                {isLoading ? (
                  <span className="animate-pulse">—</span>
                ) : (
                  <AnimatedCounter value={mealsSponsored} decimals={0} />
                )}
              </p>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-soft">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-1">Target Progress</p>
              <p className="text-3xl font-bold text-foreground">
                {isLoading ? (
                  <span className="animate-pulse">—</span>
                ) : (
                  <AnimatedCounter value={percentageComplete} suffix="%" decimals={1} />
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Identity Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <div className="bg-primary/10 border-2 border-primary rounded-full px-6 py-2">
              <p className="text-primary font-bold text-lg">🎓 Student-Led Initiative</p>
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            SVU Unity in Action
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Together, we can show the power of SVU unity. This isn't just a fundraiser—it's our chance as students to make a real impact in our community during Ramadan.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-card/50 backdrop-blur border border-border rounded-xl p-6 hover:border-primary transition-all">
              <div className="text-4xl mb-3">💪</div>
              <p className="font-semibold text-foreground mb-2">By Students</p>
              <p className="text-sm text-muted-foreground">100% student-driven and organized</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur border border-border rounded-xl p-6 hover:border-primary transition-all">
              <div className="text-4xl mb-3">🤝</div>
              <p className="font-semibold text-foreground mb-2">For Community</p>
              <p className="text-sm text-muted-foreground">Feeding families in need together</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur border border-border rounded-xl p-6 hover:border-primary transition-all">
              <div className="text-4xl mb-3">🌟</div>
              <p className="font-semibold text-foreground mb-2">SVU Pride</p>
              <p className="text-sm text-muted-foreground">Representing our university values</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Impact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Live Impact Counter
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch the difference we're making together, in real-time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="shadow-soft border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-glow">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-muted-foreground font-sans">Total Amount Raised</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-5xl font-bold text-primary">
                  {isLoading ? (
                    <span className="animate-pulse">—</span>
                  ) : (
                    <AnimatedCounter value={totalAmount} prefix="₹" decimals={0} />
                  )}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-glow">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-muted-foreground font-sans">Meals Sponsored</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-5xl font-bold text-primary">
                  {isLoading ? (
                    <span className="animate-pulse">—</span>
                  ) : (
                    <AnimatedCounter value={mealsSponsored} decimals={0} />
                  )}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  (₹{MEAL_COST_RUPEES} per meal)
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-glow">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-muted-foreground font-sans">Target Progress</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-5xl font-bold text-primary mb-4">
                  {isLoading ? (
                    <span className="animate-pulse">—</span>
                  ) : (
                    <>
                      <AnimatedCounter value={mealsSponsored} decimals={0} />
                      <span className="text-2xl text-muted-foreground"> / {targetMeals}</span>
                    </>
                  )}
                </p>
                <Progress value={percentageComplete} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  {isLoading ? "—" : `${percentageComplete.toFixed(1)}% complete`}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donation-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Make Your Contribution
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose your preferred payment method below
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* UPI QR Code */}
            <Card className="shadow-soft hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <QrCode className="h-10 w-10 text-primary mx-auto mb-3" />
                <CardTitle>Scan QR Code</CardTitle>
                <CardDescription>Pay via any UPI app</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-xl shadow-inner mb-4">
                  <img 
                    src="/assets/uploads/WhatsApp-Image-2026-02-24-at-02.11.31-1.jpeg" 
                    alt="UPI QR Code" 
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Scan with Google Pay, PhonePe, Paytm, or any UPI app
                </p>
              </CardContent>
            </Card>

            {/* UPI ID */}
            <Card className="shadow-soft hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <CreditCard className="h-10 w-10 text-primary mx-auto mb-3" />
                <CardTitle>UPI ID</CardTitle>
                <CardDescription>Copy and paste in your UPI app</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="bg-muted/50 px-6 py-4 rounded-lg w-full text-center border-2 border-dashed border-border">
                  <p className="text-xl font-mono font-semibold text-foreground mb-1">
                    8617335449@pytes
                  </p>
                  <p className="text-xs text-muted-foreground">UPI ID</p>
                </div>
                
                <Button 
                  onClick={handleCopyUPI}
                  variant="outline"
                  className="w-full"
                >
                  {copiedUPI ? (
                    <>
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy UPI ID
                    </>
                  )}
                </Button>

                <Separator />

                <div className="w-full space-y-2">
                  <p className="text-sm font-medium text-center mb-3">After payment, record your donation:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      onClick={() => handleManualDonationRecord(50)}
                      disabled={isRecordingDonation}
                      variant="secondary"
                      size="sm"
                      className="text-xs"
                    >
                      {isRecordingDonation ? <Loader2 className="h-3 w-3 animate-spin" /> : "₹50"}
                    </Button>
                    <Button 
                      onClick={() => handleManualDonationRecord(100)}
                      disabled={isRecordingDonation}
                      variant="secondary"
                      size="sm"
                      className="text-xs"
                    >
                      {isRecordingDonation ? <Loader2 className="h-3 w-3 animate-spin" /> : "₹100"}
                    </Button>
                    <Button 
                      onClick={() => handleManualDonationRecord(500)}
                      disabled={isRecordingDonation}
                      variant="secondary"
                      size="sm"
                      className="text-xs"
                    >
                      {isRecordingDonation ? <Loader2 className="h-3 w-3 animate-spin" /> : "₹500"}
                    </Button>
                    <Button 
                      onClick={() => handleManualDonationRecord(1000)}
                      disabled={isRecordingDonation}
                      variant="secondary"
                      size="sm"
                      className="text-xs"
                    >
                      {isRecordingDonation ? <Loader2 className="h-3 w-3 animate-spin" /> : "₹1000"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Razorpay */}
            <Card className="shadow-soft hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <CreditCard className="h-10 w-10 text-primary mx-auto mb-3" />
                <CardTitle>Card Payment</CardTitle>
                <CardDescription>Credit or Debit Card</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="w-full h-32 bg-muted/30 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                  <p className="text-sm text-muted-foreground text-center px-4">
                    Razorpay integration<br />coming soon
                  </p>
                </div>
                
                <Button 
                  variant="default"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled
                >
                  Pay with Card
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Secure payment powered by Razorpay
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Transparency & Accountability
            </h2>
            <p className="text-lg text-muted-foreground">
              See exactly how your donations are being used
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            {/* Expense Breakdown */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-2xl">Expense Breakdown</CardTitle>
                <CardDescription>Where your donations go</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">Meals & Food</p>
                      <p className="text-sm text-muted-foreground">Direct food cost per meal</p>
                    </div>
                    <p className="text-xl font-bold text-primary">₹40</p>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">Packaging & Logistics</p>
                      <p className="text-sm text-muted-foreground">Containers, transport, distribution</p>
                    </div>
                    <p className="text-xl font-bold text-primary">₹8</p>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">Platform Fees</p>
                      <p className="text-sm text-muted-foreground">Website hosting & maintenance</p>
                    </div>
                    <p className="text-xl font-bold text-primary">₹2</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center p-4 bg-accent/10 rounded-lg border-2 border-accent">
                    <div>
                      <p className="font-bold text-foreground text-lg">Total per Meal</p>
                      <p className="text-sm text-muted-foreground">100% goes to feeding people</p>
                    </div>
                    <p className="text-2xl font-bold text-accent">₹50</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Photo Gallery */}
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6 text-center">
              Meal Distribution Gallery
            </h3>
            <p className="text-center text-muted-foreground mb-8">
              Proof of our work on the ground
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { src: "/assets/uploads/WhatsApp-Image-2026-02-24-at-02.19.30-1.jpeg", alt: "Volunteers distributing meals" },
                { src: "/assets/uploads/WhatsApp-Image-2026-02-24-at-02.19.29-2.jpeg", alt: "Meal preparation" },
                { src: "/assets/uploads/WhatsApp-Image-2026-02-24-at-02.19.30-1--3.jpeg", alt: "Families breaking fast" },
                { src: "/assets/uploads/WhatsApp-Image-2026-02-24-at-02.19.29-1--4.jpeg", alt: "Charity event organization" },
              ].map((image, idx) => (
                <Card 
                  key={idx} 
                  className="overflow-hidden shadow-soft hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Contact Us</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start">
                  <Mail className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
                  <span>imrajsk514@gmail.com</span>
                </div>
                <div className="flex items-start">
                  <Phone className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
                  <div className="flex flex-col">
                    <span>+91 90646 65672</span>
                    <span className="mt-1">+91 93823 76193</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
                  <span>Barrackpore, Swami Vivekananda University</span>
                </div>
              </div>
            </div>

            {/* About */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">About This Campaign</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A student-led initiative at Swami Vivekananda University to feed 1000 people during Ramadan. Together, SVU students are making a real difference in our community. When we unite for a cause, we show what youth empowerment truly means.
              </p>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  <span className="text-sm">FB</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  <span className="text-sm">IG</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  <span className="text-sm">X</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="space-y-4">
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 text-center">
              <p className="text-lg font-bold text-accent flex items-center justify-center">
                <Heart className="h-5 w-5 mr-2 fill-current" />
                100% of donations go towards meal distribution
              </p>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p className="mb-2">
                This platform is built on the Internet Computer blockchain for transparency and trust.
              </p>
              <p>
                © 2026. Built with love using{" "}
                <a 
                  href="https://caffeine.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  caffeine.ai
                </a>
              </p>
            </div>

            <div className="text-xs text-muted-foreground text-center pt-4">
              <p>
                <strong>Disclaimer:</strong> This is a demonstration website. For actual donations, please verify the authenticity of the organization and payment details.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
