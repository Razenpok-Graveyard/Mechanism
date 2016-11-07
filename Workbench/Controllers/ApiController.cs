using System.Windows.Forms;
using Microsoft.AspNetCore.Mvc;

namespace Workbench.Controllers
{
    [Route("api/")]
    public class ApiController : Controller
    {
        [HttpGet("open")]
        public string OpenFile()
        {
            var dialog = new FolderBrowserDialog();
            var result = string.Empty;
            var dialogResult = dialog.ShowDialog();
            if (dialogResult == DialogResult.OK) {
                result = dialog.SelectedPath;
            }
            return result;
        }
    }
}
