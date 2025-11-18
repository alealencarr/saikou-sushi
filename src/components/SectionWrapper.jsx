const SectionWrapper = ({ children, id, className }) => (
    <section id={id} className={`py-16 sm:py-20 md:py-24 ${className || ''}`}>
      <div className="container mx-auto px-4 sm:px-6">
        {children}
      </div>
    </section>
);

export default SectionWrapper;