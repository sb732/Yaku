import SwiperList from "../SwiperList";
import ProjectCard from "../cards/ProjectCard";
import DetailView from "./DetailView";

export const GamingAssetsSection = ({ title = 'Yaku Gaming Assets', items, handleUrl }: { title: string; items: Array<{ image?: string; name: string; description?: string; url?: string; listed?: number; supply?: number; }>; handleUrl: Function}) => {
  return (
    <>
      <div>
        <div className="flex flex-row items-center">
          <h2 className="text-xl font-akirabold sm:text-3xl font-bold">
            {title}
          </h2>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        style={{ filter: "blur(64px)", paddingTop: "600px" }}
        aria-hidden="true"
      >
        <div
          className="aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="py-[20px]">
        <div>
          <SwiperList
            items={items}
            css="!w-full pl-4 pt-4"
            components={({
              image,
              name,
              description,
              url,
              listed,
              supply,
            }: any) => (
              <ProjectCard
                sqaure={false}
                truncate={false}
                image={image}
                name={name}
                description={description}
                onClick={() => handleUrl(url)}
              >
                <DetailView listed={listed} supply={supply} />
              </ProjectCard>
            )}
            slidesPerView={{
              sm: "auto",
              md: "auto",
              lg: "auto",
            }}
            slidesPerGroup={1}
            spaceBetween="1.33%"
            slideCss="!h-auto sm:!w-[360px] !w-[90%]"
          />
        </div>
      </div>
    </>
  );
};