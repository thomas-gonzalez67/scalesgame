using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.Data;
using System.Data.SqlClient;
using webapi.Model;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly IWebHostEnvironment env;

        public PlayerController(IConfiguration configuration, IWebHostEnvironment env)
        {
            this.configuration = configuration;
            this.env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select * from dbo.GamePlayers";

            DataTable table = new DataTable();
            string sqlDataSource = configuration.GetConnectionString("MvcPlayerContext");
            SqlDataReader myReader;
            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand = new SqlCommand(query, myCon)) 
                {
                    myReader=myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post(Player player)
        {
            string query = @"
                insert into dbo.GamePlayers values (@PlayerID, @PlayerName, 0, 0, 'no', 'default', @RoomName)";

            DataTable table = new DataTable();
            string sqlDataSource = configuration.GetConnectionString("MvcPlayerContext");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("PlayerID", player.Id);
                    myCommand.Parameters.AddWithValue("PlayerName", player.PlayerName);
                    myCommand.Parameters.AddWithValue("RoomName", player.Room);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPut]
        public JsonResult Put(Player player)
        {
            string query = @"
                update dbo.GamePlayers set Icon=@PlayerIcon, InGame=@InGame where PlayerID=@PlayerID";

            DataTable table = new DataTable();
            string sqlDataSource = configuration.GetConnectionString("MvcPlayerContext");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("PlayerID", player.Id);
                    myCommand.Parameters.AddWithValue("PlayerIcon", player.Icon);
                    myCommand.Parameters.AddWithValue("InGame", player.InGame);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [Route("SubmitScore")]
        [HttpPut]
        public JsonResult SubmitScore(Player player)
        {
            string query = @"
                update dbo.GamePlayers set Score=@Score, InGame=@InGame where PlayerID=@PlayerID";

            DataTable table = new DataTable();
            string sqlDataSource = configuration.GetConnectionString("MvcPlayerContext");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("PlayerID", player.Id);
                    myCommand.Parameters.AddWithValue("Score", player.Score);
                    myCommand.Parameters.AddWithValue("InGame", player.InGame);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [Route("ChangeLives")]
        [HttpPut]
        public JsonResult ChangeLives(Player player)
        {
            string query = @"
                update dbo.GamePlayers set Lives=@Lives where PlayerID=@PlayerID";

            DataTable table = new DataTable();
            string sqlDataSource = configuration.GetConnectionString("MvcPlayerContext");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("PlayerID", player.Id);
                    myCommand.Parameters.AddWithValue("Lives", player.Lives);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }



        [HttpDelete]
        public JsonResult Delete(Player player)
        {
            string query = @"
                delete from dbo.GamePlayers where PlayerID=@PlayerID";

            DataTable table = new DataTable();
            string sqlDataSource = configuration.GetConnectionString("MvcPlayerContext");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("PlayerID", player.Id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }


        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath= env.ContentRootPath +"/Photos/"+filename;
                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                return new JsonResult(filename);
            }

            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }
    }
}
