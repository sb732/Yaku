import SwiperList from "../SwiperList";
import ProjectCard from "../cards/ProjectCard";
import TowerView from "./TowerView";

export const EstateSection = ({
  title = "Yaku Estates",
  items = [],
  isLoading,
  handleUrl,
}: {
  title: string;
  items?: Array<{
    image?: string;
    name: string;
    height?: number;
    type?: string;
    surface?: number;
    location?: string;
    href?: string;
  }>;
  isLoading: boolean;
  handleUrl: Function;
}) => {
  return (
    <>
      <div>
        <div className="flex flex-row items-center">
          <h2 className="text-xl font-akirabold sm:text-3xl font-bold z-10">
            {title}
          </h2>
        </div>
      </div>
      <div className="py-[20px]">
        <div>
          <SwiperList
            items={items}
            css="!w-full pl-4 pt-4"
            components={({
              image,
              name,
              height,
              type: estateType,
              surface,
              location,
              href,
            }: any) => (
              <ProjectCard
                sqaure
                image={image}
                name={name}
                description={location}
                nameTag={estateType}
                height={200}
                onClick={() => handleUrl(href)}
              >
                <TowerView
                  height={height}
                  type={estateType}
                  surface={surface}
                  loading={isLoading}
                />
              </ProjectCard>
            )}
            slidesPerView={{
              sm: "auto",
              md: "auto",
              lg: "auto",
            }}
            slidesPerGroup={1}
            spaceBetween={16}
            slideCss="!h-auto sm:!w-[220px] !w-[90%]"
          />
        </div>
      </div>
    </>
  );
};