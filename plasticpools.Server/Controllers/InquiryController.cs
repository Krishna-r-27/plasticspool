using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using plasticpools.Server.DTOs;
using System.Net;
using System.Net.Mail;

namespace plasticpools.Server.Controllers
{
    [Route("api/inquiry")]
    [ApiController]
    public class InquiryController : ControllerBase
    {
        [HttpPost("send")]
        public async Task<IActionResult> SendInquiry([FromBody] InquiryDTO dto)
        {
            try
            {
                // ✅ Email Body (HTML)
                string body = $@"
                    <h2>New Inquiry Received</h2>
                    <p><b>Name:</b> {dto.Name}</p>
                    <p><b>Company:</b> {dto.Company}</p>
                    <p><b>Phone:</b> {dto.Phone}</p>
                    <p><b>Email:</b> {dto.Email}</p>
                    <p><b>Address:</b> {dto.Address}</p>
                    <p><b>Message:</b> {dto.Message}</p>
                ";

                // ✅ SMTP CONFIG (CHANGE THIS)
                var smtp = new SmtpClient("mail.plasticspool.com")
                {
                    Port = 99,
                    Credentials = new NetworkCredential("forms@plasticspool.com", "lPz86d%9"),
                    //EnableSsl = true,
                };

                // ✅ MAIL
                var message = new MailMessage
                {
                    From = new MailAddress("forms@plasticspool.com"),
                    Subject = "New Inquiry Form Submission",
                    Body = body,
                    IsBodyHtml = true
                };

                // 👉 kisko mail bhejna hai
                message.To.Add("htpbobbin@yahoo.com");

                // 👉 user ko bhi reply bhejna ho to:
                if (!string.IsNullOrEmpty(dto.Email))
                {
                    message.ReplyToList.Add(dto.Email);
                }

                // ✅ SEND MAIL
                await smtp.SendMailAsync(message);

                return Ok(new { message = "Email sent successfully ✅" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error ❌", error = ex.Message });
            }
        }
    }
}
