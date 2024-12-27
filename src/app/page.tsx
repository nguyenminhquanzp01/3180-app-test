'use client'
import React from "react";
import Footer from "@/components/layout/footer";
import { CloudMoon, Sun, MapPin, Shield } from "lucide-react";
import { motion } from 'framer-motion';
import Image from "next/image";
import {Button} from "@/components/ui/button";

const Home = () => {
  return (
    <>
      <main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75"
        >
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover min-h-[550px]"
            style={{
              backgroundImage:
                "url('https://www.marinabaysands.com/content/dam/marinabaysands/homepage/rebrand/homepage-masthead-1920x823-1.jpg')",
            }}
          >
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center"
              >
                <div className="px-12 text-center">
                  <p className="text-white font-light text-2xl mb-6"> WELCOME TO </p>
                  <h1 className="text-white font-light text-5xl">
                    B L U E M O O N
                  </h1>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <section className="pb-20 pt-48 mt-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-8">

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="w-full md:w-5/12 px-4 mr-auto ml-auto"
              >
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  BlueMoon là chung cư hiện đại bậc nhất
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4">
                  Tọa lạc ngay ngã tư Văn Phú được khởi công xây dựng năm 2021 và
                  hoàn thành vào 2023. Chung cư được xây dựng trên diện tích
                  450m2, gồm 30 tầng, tầng 1 làm kiot, 4 tầng đế, 24 tầng nhà ở
                  và 1 tầng penhouse.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="w-full md:w-4/12 px-4 mr-auto ml-auto"
              >
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg">
                  <Image
                    width={500}
                    height={500}
                    alt="BlueMoon là chung cư hiện đại bậc nhất"
                    src="/img/a2.jpg"
                    className="object-cover align-middle rounded-t-lg"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          ></div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="w-full md:w-6/12 ml-auto mr-auto px-4"
              >
                <Image
                  width={500}
                  height={500}
                  alt="BlueMoon là chung cư danh giá bậc nhất"
                  src="/img/a33.jpg"
                  className="max-w-full rounded-lg shadow-lg"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="w-full md:w-5/12 ml-auto mr-auto px-4 mt-4"
              >
                <div className="md:pr-12">
                  <h3 className="text-3xl font-semibold">
                    BlueMoon là chung cư danh giá bậc nhất
                  </h3>
                  <p className="text-lg font-light leading-relaxed mt-4 mb-[30px] text-blueGray-600">
                    Đến với chung cư BlueMoon, quý khách sẽ được chào đón bởi
                    sự thân thiện của đội ngũ nhân viên tận tình và tận hưởng
                    những dịch vụ cao cấp bậc nhất khu vực, đảm bảo sẽ mang đến
                    cho quý khách một trải nghiệm ấn tượng không
                    thể nào quên.
                  </p>
                  <h5 className="text-1xl font-semibold inline-block border-b-2 border-black pb-1 mb-[20px]"> Khám phá thêm</h5>
                  <div className="flex">
                  <Image
                    width={225} 
                    height={225}
                    alt="Khu vui choi"
                    src="/img/a44.jpg"
                    className="max-w-full rounded-lg shadow-lg mr-auto"
                  />
                    <Image
                    width={225} 
                    height={225}
                    alt="Phong gym"
                    src="/img/a55.jpg"
                    className="max-w-full rounded-lg shadow-lg ml-[50px]"
                  />
                  </div>
                  <div className="flex">
                  <p className="mt-2 ml-[60px] mr-[180px] text-lg text-center font-medium">Khu vui chơi</p>
                  <p className="mt-2 text-lg text-center font-medium">Phòng gym</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>         
        </section>

        {/* 3 */}

        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          ></div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="w-full md:w-6/12 ml-auto mr-auto px-4"
              >
                <Image
                  width={500}
                  height={500}
                  alt="BlueMoon là chung cư danh giá bậc nhất"
                  src="/img/a6.jpg"
                  className="max-w-full rounded-lg shadow-lg"
                />

                <div className="md:pr-12 mt-10">
                  <h3 className="text-3xl font-medium">
                    Ẩm thực tại BlueMoon
                  </h3>
                  <p className="text-lg font-light leading-relaxed mt-4 mb-[30px] text-blueGray-600">
                  Những bữa ăn ngon miệng, đầy đủ dinh dưỡng sẽ giúp cư dân vừa 
                  tận hưởng cuộc sống tiện nghi, vừa duy trì sức khỏe. Đặc biệt, 
                  các nhà hàng tại BlueMoon luôn cam kết chất lượng thực phẩm 
                  tươi ngon và phục vụ tận tâm.
                  </p>
                </div>

                <h5 className="text-1xl font-semibold inline-block border-b-2 border-black pb-1 mb-[20px]"> Xem chi tiết</h5>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="w-full md:w-5/12 ml-auto mr-auto px-4"
              >
                <Image
                  width={500}
                  height={500}
                  alt="BlueMoon là chung cư danh giá bậc nhất"
                  src="/img/a7.jpeg"
                  className="max-w-full rounded-lg shadow-lg"
                />

                <div className="md:pr-12 mt-10">
                  <h3 className="text-3xl font-medium">
                    Hoạt động tại BlueMoon
                  </h3>
                  <p className="text-lg font-light leading-relaxed mt-4 mb-[30px] text-blueGray-600">
                  Là nơi an cư lý tưởng mà còn là không gian sống đầy năng động 
                  với nhiều hoạt động cộng đồng phong phú. Cư dân có thể tham 
                  gia vào các câu lạc bộ thể thao, hội thảo, sự kiện văn hóa 
                  và các buổi giao lưu. Tại đây, mỗi cư dân đều có thể tìm 
                  thấy những người bạn mới và những trải nghiệm thú vị.
                  </p>
                </div> 

                <h5 className="text-1xl font-semibold inline-block border-b-2 border-black pb-1 mb-[20px] "> Xem chi tiết</h5>
              </motion.div>

              

            </div>
          </div>         
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Home;
