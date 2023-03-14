interface TextProps {
  children: React.ReactNode;
}

const Title = ({ children }: TextProps) => {
  return (
    <h3 className="text-h3 mb-16 text-gray-900 dark:text-gray-100">
      {children}
    </h3>
  );
};

const Subtitle = ({ children }: TextProps) => {
  return (
    <h5 className="text-h5 mb-6 text-gray-900 dark:text-gray-100">
      {children}
    </h5>
  );
};

const Paragraph = ({ children }: TextProps) => {
  return (
    <h5 className="text-subtitle2 mb-12 md:text-subtitle1 text-gray-600 dark:text-gray-400">
      {children}
    </h5>
  );
};

const Article = () => {
  return (
    <article className="prose mt-52 max-w-[800px]">
      <Title>Bevezetés</Title>
      <Subtitle>Áttekintés</Subtitle>
      <Paragraph>
        A ViddL-t 2017-ben alapították olyan fiatalok, akik úgy gondolták,
        változásra van szükség a csomagszállításban, jobb technológiai háttérrel
        az iparágat meg lehetne újítani, mivel ezen a területen kevés innováció
        történt az utóbbi években. Belevágtak és sok munkával elérték, hogy mára
        napi több ezer csomagot visznek ki Magyarország szerte. A ViddL nagy
        logisztikai vállalatokkal szerződik le és az utolsó kilométeres
        kiszállítását végzik el csomagoknak gyalogos/biciklis futárok
        segítségével. A vállalatoktól reggelente több ezer csomag érkezik a
        ViddL depojába, majd a futárok egy mobil applikáció segítségével
        szállítanak a címekre, a címzetteket pedig egy több szintes rendszeren
        keresztül értesítik a kiszállításról. Mivel folyamatosan optimalizálják
        a csomagok útvonalát, képesek szinte percre pontosan megmondani, mikor
        érkezik a futár.
      </Paragraph>
      <Subtitle>Feladataim</Subtitle>
      <Paragraph>
        Akkor kezdtem el dolgozni a ViddL-el amikor már készen volt a futár
        applikáció és a belsős admin rendszerük is, és ezek segítségével folyt
        már a kiszállítás. Startup vállalkozás révén a kezdeti rendszer egy
        minimális funkcionalitással és kissé esetlen megjelenéssel bíró MVP volt
        amivel a mindennapi kiszállítást meg tudta már oldani a vállalkozás
        komolyabb fennakadások nélkül. Az én feladatom egyrészt az volt, hogy a
        ViddL rendszereinek megjelenését egységesítsem, hozzak létre egy olyan
        design systemet amit a fejlesztők könnyen tudnak implementálni. Másrészt
        pedig erre a design systemre alapozva, lépésről-lépésre tervezzem újra a
        ViddL alkalmazásait, hogy azok könnyebben használhatóak legyenek.
      </Paragraph>
      <Subtitle>Eredmény</Subtitle>
      <Paragraph>
        A két éves együttműködésünk során sikerült felépíteni egy olyan egységes
        design system könyvtárat amit a későbbiekben a további fejlesztésekhez
        gyorsan és hatékonyan tudnak használni. A csomagkövetési rendszert
        teljesen újraterveztük, aminek segítségével sokkal pontosabban lehet így
        értesíteni a csomagok érkezéséről a címzetteket. A futárok
        mobilalkalmazása is egy teljes értékű modern felületet kapott ami jobban
        leköveti a kiszállítás menetét és egyszerűbb felhasználást biztosít a
        futárok számára. Az admin felületet is új felhasználó központú
        megjelenést kapott, így egyszerűbben követhetik a napi kiszállítást a
        futárkoordinátorok, depo vezetők és a menedzsment is.
      </Paragraph>
    </article>
  );
};

export default Article;
