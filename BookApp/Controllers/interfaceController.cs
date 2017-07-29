using BookApp.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using WebApplication1.Models;

namespace BookApp.Controllers
{
    public class interfaceController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage GetString()
        {
            return CreateResponse(new { result = "sdfsfsd" });
        }
        [HttpGet]
        public HttpResponseMessage GetBaiAll()
        {
            using (var db = new Entities())
            {
                var query = db.tb_bai.Select(b => b).ToList();
                return CreateResponse(query);
            }
        }
        [HttpGet]
        public HttpResponseMessage GetBaiByChuyenDe(string id_chuyende)
        {

            var id = -1;
            if (!int.TryParse(id_chuyende, out id))
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest);
                response.Content = new StringContent("Invalid idChuyende", Encoding.UTF8, "application/json");
                return response;
            }
            using (var db = new Entities())
            {
                var query = db.tb_bai.Where(b => b.id_chuyende == id).Select(b => new EnBai
                {
                    id_bai = b.id_bai,
                    id_chuyende = b.id_chuyende,
                    thu_tu = b.thu_tu,
                    xuat_ban = b.xuat_ban,
                    ngay_tao = b.ngay_tao,
                    bai_mau = b.bai_mau,
                    ds_templatenoidungdebai = b.tb_templatenoidung.Select(t => new EnTemplateNoiDung
                    {
                        id_template = t.id_templatenoidung,
                        loai_template = t.loai_template,
                        template_noidung_text = new EnTemplateNoiDungText
                        {
                            noi_dung = t.tb_templatenoidung_text.noidung,
                        },
                        template_noidung_hinhanh = new EnTemplateNoiDungHinhAnh
                        {
                            url = t.tb_templatenoidung_hinhanh.url
                        }
                    }).ToList(),
                    ds_cauhoi = b.tb_cauhoi.Select(h => new EnCauHoi
                    {
                        id_cauhoi = h.id_cauhoi,
                        id_bai = h.id_bai,
                        loai_cau_hoi = h.loai_cau_hoi,
                        phuongthuc_check_dapan = h.phuong_thuc_check_dap_an,
                        ngay_tao = h.ngay_tao,
                        xuat_ban = h.xuat_ban,
                        thu_tu = h.thu_tu,
                        gia_tri_dung = h.gia_tri_dung,
                        ds_dapan = h.tb_dapan.Select(a => new EnDapAn
                        {
                            id_dapan = a.id_dapan,
                            id_cauhoi = a.id_cauhoi,
                            loai_dap_an = a.loai_dap_an,
                            ds_dapan_singlechoice = new EnDapAnSingleChoice
                            {
                                noi_dung = a.tb_dapan_singlechoice.noidung,
                                dap_an_dung = a.tb_dapan_singlechoice.dapan_dung
                            },
                            ds_dapan_danhdau = new EnDapAnDanhDau
                            {
                                vi_tri_dung = a.tb_dapan_danhdau.vitri_dung
                            },
                            ds_dapan_dientext = new EnDapAnDienText
                            {
                                gia_tri_dung = a.tb_dapan_dientext.giatri_dung,
                                help_text = a.tb_dapan_dientext.help_text
                            }
                        }).ToList()
                    }).ToList()
                });
                return CreateResponse(query);
            }
        }

        private HttpResponseMessage CreateResponse(object content)
        {
            var result = JsonConvert.SerializeObject(content, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(result, Encoding.UTF8, "application/json");
            return response;
        }
    }
}
